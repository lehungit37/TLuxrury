import { config } from "../../config/index";
import { isObjectId, validatePhoneNumber } from "../../util/validate";
import { EPermission, ERoleLevel } from "../../interface/enum";
import { to } from "await-to-js";
import { AuthenticationApp } from "../../app/authentication";
// import { IPermissionSchemes } from './../../interface/permissionScheme';
// import { PermissionSchemesApp } from './../../app/permission_schemes';
import { IRouter, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import { replaceTrimString } from "../../util/function";
import { IPayloadGetUser, IUser } from "../../interface/user";
import { RoleApp } from "../../app/role";
import { AppError } from "../../models/utils";
import { UserModel } from "../../models/user";
import { UserApp } from "../../app/user";
import { LoginApp } from "../../app/login";
import { SessionApp } from "../../app/session";
import { isValidAuth, isValidId } from "../../util/request";
import { validateLoginPayload, validateId } from "../../util/validate";
import {
  checkAuthorization,
  checkPermission,
} from "../middleware/authorization";

export const userRouter = (router: IRouter) => {
  // router.post('/users/login/google', loginByGoogle);
  router.post("/users/login", login);

  router.post("/users/logout", checkAuthorization, logout);
  router.post(
    "/users",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_USER),
    getUserList
  );
  router.post(
    "/users/add",
    checkAuthorization,
    checkPermission(EPermission.ADD_USER),
    addUser
  );
  router.post(
    "/users/:userId/sessions/revoke/all",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    revokeAllSession
  );
  router.post(
    "/users/:userId/sessions/revoke",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    revokeOneSession
  );

  router.put(
    "/users/:userId/verify_password",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    verifyAndUpdatePassword
  );
  router.put(
    "/users/:userId/active_email",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    sendActiveEmail
  );
  router.put(
    "/users/:userId/password",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    updateUserPassword
  );
  router.put("/users/me/change_pass", checkAuthorization, updateMyPassword);
  router.put("/users/me/change_phone", checkAuthorization, updateMyPhoneNumber);
  router.put(
    "/users/:userId",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_USER),
    updateUser
  );

  router.delete(
    "/users/:userId",
    checkAuthorization,
    checkPermission(EPermission.DELETE_USER),
    checkAuthorization,
    deleteUser
  );

  router.get("/users/me", checkAuthorization, getMe);
  router.get("/users/getMe", checkAuthorization, getMe);
  router.get("/users/forgot_password", receiveEmailForgotPassword);
  router.get(
    "/users/checkEmail",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_USER),
    checkExistEmail
  );
  router.get(
    "/users/:userId/sessions",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_USER),
    getSessions
  );
  router.get(
    "/users/:userId",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_USER),
    getDetailUser
  );
};

const checkPermissionActionWithUser = async (
  myLevel: ERoleLevel,
  myId: string,
  userActionId: string
) => {
  if (myId !== userActionId) {
    const userActionRole = await new RoleApp().getRoleByUserId(userActionId);

    if (userActionRole.level === myLevel)
      throw new AppError(
        "router.userRouter.checkPermissionActionWithUser",
        "Không thể thao tác với người dùng cùng vai trò",
        StatusCodes.FORBIDDEN
      );
  }

  return;
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { error } = validateLoginPayload({ email, password });

    if (error) {
      throw new AppError(
        "router.user.login",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }
    const loginApp = new LoginApp();

    const { user, errors } = await loginApp.authenticateUserForLogin(
      email.toLowerCase(),
      password
    );
    if (errors) throw errors;

    if (user) {
      const token = await loginApp.login(user, "", req);
      res.json({ token });

      return;
    }
    res.json({ token: "" });
  } catch (error) {
    next(error);
  }
};

// const loginByGoogle = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const tokenId = req.body.tokenId as any;

//     console.log(tokenId);

//     oAuthClient
//       .verifyIdToken({ idToken: tokenId, audience: config.google.clientId })
//       .then(async (response) => {
//         const { email, email_verified, name } = response.getPayload();

//         if (!email_verified) {
//           throw new AppError('router.user.loginByGoogle', 'Email chưa đươc xác thực', StatusCodes.FORBIDDEN);
//         }

//         const [error, userGoogleAdded] = await to(new UserApp().loginBySocial({ email, name }, 'google'));

//         if (!_.isEmpty(error)) {
//           console.log(error);

//           throw error;
//         }

//         const token = await new LoginApp().login(userGoogleAdded, '', req);

//         res.json({ token });
//       })
//       .catch((error) => {
//         throw new AppError(
//           'router.user.loginByGoogle',
//           'Lỗi hệ thống',
//           StatusCodes.INTERNAL_SERVER_ERROR,
//           error.message
//         );
//       });
//   } catch (error) {
//     next(error);
//   }
// };

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization, error } = isValidAuth(req);
    if (error) throw error;

    await new SessionApp().deleteSession(authorization);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers.user_id;

    console.log(userId);

    // const userId = "65426946dbb750f5f52f5fa6";

    if (!userId) {
      throw new AppError(
        "api.router.getUserList.validateGetUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const userInfo = await new UserApp().getById(userId as string);

    return res.json(userInfo);
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload: IPayloadGetUser = req.body;
    const errValidate = await UserModel.validateGetUser(payload);

    if (!_.isEmpty(errValidate)) {
      throw new AppError(
        "api.router.getUserList.validateGetUser",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    // const { level } = await checkPermissionAndGetRoleUser(
    //   req,
    //   EPermission.GET_LIST_USER
    // );

    const level = ERoleLevel.SUPER_ADMIN;

    const result = await new UserApp().getUserList(payload, level);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getDetailUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new AppError(
        "api.router.getDetailUser",
        "Id người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    // await checkPermissionAndGetRoleUser(req, EPermission.GET_LIST_USER);

    const user = await new UserApp().getById(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = req.body;
    // await checkPermissionAndGetRoleUser(req, EPermission.ADD_USER);

    if (!user.roleId) {
      throw new AppError(
        "api.router.addUser",
        "Vai trò người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }
    const errorValidate = await UserModel.validateAddUser(user);

    if (!_.isEmpty(errorValidate)) {
      throw new AppError(
        "api.router.addUser",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errorValidate
      );
    }

    const checkRole = await new RoleApp().getById(user.roleId as string);

    if (_.isEmpty(checkRole)) {
      throw new AppError(
        "api.router.addUser",
        "Vai trò không tồn tại hoặc đã bị xóa",
        StatusCodes.BAD_REQUEST
      );
    }

    const user_id = req.headers.user_id;
    const result = await new UserApp().addUser(user, user_id as string);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const checkExistEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    if (!replaceTrimString(email as string)) {
      throw new AppError(
        "api.router.addRole",
        "Thông tin email không hợp lệ",
        StatusCodes.BAD_REQUEST,
        ""
      );
    }

    const result = await new UserApp().checkExistEmail(
      replaceTrimString(email as string)
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user: any = req.body;

    if ("email" in user) {
      throw new AppError(
        "api.router.updateUser",
        "Email không thể thay đổi",
        StatusCodes.BAD_REQUEST
      );
    }

    const errorValidate = await UserModel.validateUpdateUser(user);

    if (!_.isEmpty(errorValidate)) {
      throw new AppError(
        "api.router.updateUser",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errorValidate
      );
    }

    if ("roleId" in user && Boolean(user.roleId as string)) {
      const [errGetUser, userCurrent] = await to(new UserApp().getById(userId));

      if (!_.isEmpty(errGetUser)) throw errGetUser;

      const checkRole = await new RoleApp().getById(user.roleId as string);

      if (_.isEmpty(checkRole)) {
        throw new AppError(
          "api.router.updateUser",
          "Vai trò không tồn tại hoặc đã bị xóa",
          StatusCodes.BAD_REQUEST
        );
      }

      if (userCurrent?.roleId.toHexString() === user.roleId) {
        throw new AppError(
          "api.router.checkSameRole",
          "Vui lòng thay đổi vai trò trước khi lưu",
          StatusCodes.BAD_REQUEST
        );
      }
    }

    let user_id = "";
    if (userId === "me") {
      user_id = req.headers.user_id as string;
    } else {
      user_id = userId;
      const { userId: myId, level } = await checkPermissionAndGetRoleUser(
        req,
        EPermission.UPDATE_USER
      );
      await checkPermissionActionWithUser(level, myId, userId);
    }

    const result = await new UserApp().updateUser(
      user_id,
      user,
      req.headers.user_id as string
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const verifyAndUpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, token, email } = req.body;
    const { userId } = req.params;
    const errors = await UserModel.validatePassword(password);
    if (!_.isEmpty(errors)) {
      throw new AppError(
        "router.user.verifyAndUpdatePassword.validatePassword",
        "Mật khẩu không đúng định dạng, bao gồm ký tự hoa, ký tự thường, ký tự đặc biệt, số và tối thiểu 8 ký tự",
        StatusCodes.BAD_REQUEST,
        "",
        errors
      );
    }
    await new UserApp().verifyAndUpdatePassword(userId, token, email, password);
    res.json("OK");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, paramId } = isValidId(req, "userId");
    if (error) throw error;
    const { userId: myId, level } = await checkPermissionAndGetRoleUser(
      req,
      EPermission.DELETE_USER
    );
    await checkPermissionActionWithUser(level, myId, paramId);

    const user = await new UserApp().getById(paramId);

    if (_.isEmpty(user)) {
      throw new AppError(
        "router.user.delete_user.checkHasUser",
        "Người dùng đã được xóa hoặc không tồn tại",
        StatusCodes.NOT_FOUND
      );
    }

    const userActionId = req.headers.user_id as string;

    await new UserApp().deleteUser(paramId, userActionId);
    res.json({ message: "ok" });
  } catch (error) {
    next(error);
  }
};

const getSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { error, paramId } = isValidId(req, 'userId');
    const { error } = validateId(req.params.userId);
    if (error) {
      throw new AppError(
        "users.getSessions",
        "Request không hợp lệ",
        StatusCodes.BAD_REQUEST,
        error.message
      );
    }

    const userId = req.params.userId;

    const sessions = await new SessionApp().getSessions(userId);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

const checkPermissionAndGetRoleUser = async (
  req: Request,
  permissionName: string
): Promise<{ userId: string; level: number }> => {
  const user_id = req.headers.user_id as string;
  // const token = req.headers.authorization || "";
  // const [error, role] = await to(
  //   new AuthenticationApp().checkPermissionUser(
  //     user_id as string,
  //     permissionName,
  //     token
  //   )
  // );
  // if (!_.isEmpty(error)) throw error;
  // return { userId: user_id as string, level: role?.level || 0 };
  return { userId: user_id, level: 0 };
};

const receiveEmailForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    const checkExistEmail = await new UserApp().getUserByEmail(email as string);

    const userId = checkExistEmail.id || "";

    const [err] = await to(
      new UserApp().sendTokenForgotPassword(userId, email as string)
    );
    if (!_.isEmpty(err)) throw err;

    res.send("OK");
  } catch (error) {
    next(error);
  }
};

const revokeAllSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId: myId, level } = await checkPermissionAndGetRoleUser(
      req,
      EPermission.UPDATE_USER
    );

    const { userId } = req.params;
    const { error: errorUserId } = validateId(userId);
    if (errorUserId) {
      throw new AppError(
        "router.users.revokeAllSession.validateUserId",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        errorUserId.message
      );
    }

    await checkPermissionActionWithUser(level, myId, userId);
    const result = await new SessionApp().revokeAllSessionOfUser(userId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const revokeOneSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { sessionId } = req.body;
    const { error: errorUserId } = validateId(userId);
    const { error: errorSessionId } = validateId(sessionId);

    if (errorUserId) {
      throw new AppError(
        "router.users.revokeOneSession.validateUserId",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        errorUserId.message
      );
    }

    if (errorSessionId || !sessionId) {
      throw new AppError(
        "router.users.revokeOneSession.validateSessionId",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        errorSessionId?.message
      );
    }

    const result = await new SessionApp().revokeOneSessionOfUser(
      userId,
      sessionId
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const sendActiveEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await checkPermissionAndGetRoleUser(req, EPermission.UPDATE_USER);

    const { userId } = req.params;
    if (!userId) {
      throw new AppError(
        "api.router.getDetailUser",
        "Id người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await new UserApp().getById(userId);

    if (_.isEmpty(user)) {
      throw new AppError(
        "api.router.getDetailUser",
        "Người dùng không tồn tại hoặc đã bị xóa",
        StatusCodes.NOT_FOUND
      );
    }

    if (!user.email) {
      throw new AppError(
        "api.router.getDetailUser",
        "Email người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    await new UserApp().sendTokenActiveEmail(userId, user.email);

    res.send("OK");
  } catch (error) {
    next(error);
  }
};

const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!userId) {
      throw new AppError(
        "api.router.getDetailUser",
        "Id người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }
    const { userId: myId, level } = await checkPermissionAndGetRoleUser(
      req,
      EPermission.UPDATE_USER
    );

    await checkPermissionActionWithUser(level, myId, userId);

    const user = await new UserApp().getById(userId);

    if (_.isEmpty(user)) {
      throw new AppError(
        "api.router.getDetailUser",
        "Người dùng không tồn tại hoặc đã bị xóa",
        StatusCodes.NOT_FOUND
      );
    }

    const errors = await UserModel.validatePassword(password);
    if (!_.isEmpty(errors)) {
      throw new AppError(
        "router.user.verifyAndUpdatePassword.validatePassword",
        "Mật khẩu không đúng định dạng, bao gồm ký tự hoa, ký tự thường, ký tự đặc biệt, số và tối thiểu 8 ký tự",
        StatusCodes.BAD_REQUEST,
        "",
        errors
      );
    }

    await new UserApp().updateNewPassword(userId, password);

    res.send("OK");
  } catch (error) {
    next(error);
  }
};

const updateMyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.headers.user_id as string;
    const body = req.body;

    const isValidId = isObjectId(userId);

    if (!isValidId) {
      throw new AppError(
        "router.user.changePhoneNumber.isValidId",
        "UserId không hợp lệ",
        StatusCodes.NOT_FOUND
      );
    }
    const errorValidate = await UserModel.validateUpdateMyPassword(body);

    if (!_.isEmpty(errorValidate)) {
      throw new AppError(
        "router.user.verifyAndUpdatePassword.validatePassword",
        "Mật khẩu không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errorValidate
      );
    }

    const errors = await UserModel.validatePassword(body.oldPassword);
    if (!_.isEmpty(errors)) {
      throw new AppError(
        "router.user.verifyAndUpdatePassword.validatePassword",
        "Mật khẩu không đúng định dạng, bao gồm ký tự hoa, ký tự thường, ký tự đặc biệt, số và tối thiểu 8 ký tự",
        StatusCodes.BAD_REQUEST,
        "",
        errors
      );
    }

    const errors2 = await UserModel.validatePassword(body.newPassword);
    if (!_.isEmpty(errors2)) {
      throw new AppError(
        "router.user.verifyAndUpdatePassword.validatePassword",
        "Mật khẩu không đúng định dạng, bao gồm ký tự hoa, ký tự thường, ký tự đặc biệt, số và tối thiểu 8 ký tự",
        StatusCodes.BAD_REQUEST,
        "",
        errors2
      );
    }

    const isCorrectPassword = await new UserApp().checkCorrectPassword(
      userId,
      body.oldPassword
    );

    if (!isCorrectPassword) {
      throw new AppError(
        "router.user.updateMyPassword.checkCorrectPassword",
        "Mật khẩu cũ không đúng, vui lòng thử lại",
        StatusCodes.BAD_REQUEST
      );
    }

    const [err] = await to(
      new UserApp().updateNewPassword(userId, body.newPassword)
    );

    if (!_.isEmpty(err)) throw err;

    res.json("OK");
  } catch (error) {
    next(error);
  }
};

const updateMyPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, password } = req.body;
    const userId = req.headers.user_id as string;

    const isPhoneNumber = validatePhoneNumber(phoneNumber);

    if (!isPhoneNumber) {
      throw new AppError(
        "router.user.updateMyPhoneNumber.validatePhoneNumber",
        "Số điện thoại không đúng định dạng, vui lòng thử lại",
        StatusCodes.BAD_REQUEST
      );
    }

    const isCorrectPassword = await new UserApp().checkCorrectPassword(
      userId,
      password
    );

    if (!isCorrectPassword) {
      throw new AppError(
        "router.user.updateMyPassword.checkCorrectPassword",
        "Mật khẩu cũ không đúng, vui lòng thử lại",
        StatusCodes.BAD_REQUEST
      );
    }

    const isValidId = isObjectId(userId);

    if (!isValidId) {
      throw new AppError(
        "router.user.changePhoneNumber.isValidId",
        "UserId không hợp lệ",
        StatusCodes.NOT_FOUND
      );
    }

    await checkPermissionAndGetRoleUser(req, EPermission.DELETE_USER);

    const user = await new UserApp().getById(userId);

    if (_.isEmpty(user)) {
      throw new AppError(
        "router.user.delete_user.checkHasUser",
        "Người dùng đã được xóa hoặc không tồn tại",
        StatusCodes.NOT_FOUND
      );
    }

    const [err, result] = await to(
      new UserApp().changePhoneNumber(userId, phoneNumber)
    );

    if (!_.isEmpty(err)) {
      throw err;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};
