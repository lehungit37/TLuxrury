import { RoleApp } from "./role";
import { SessionApp } from "./session";
import { ObjectId } from "mongodb";
import { TokenApp } from "./token";
import { config } from "./../config/index";
import { extendSessionExpirationTime } from "./../models/session";
import { TokenModel } from "./../models/token";
import { IToken } from "./../interface/token";
import { UserModel } from "./../models/user";
import { StatusCodes } from "http-status-codes";
import { to } from "await-to-js";
import _ from "lodash";

import { replaceTrimString } from "./../util/function";
import { AppError } from "./../models/utils";
import { IUser, IPayloadGetUser } from "./../interface/user";
import store from "../stores";
import { AuthenticationApp } from "./authentication";
import { Mailer } from "../mail";

const where = "app.validate.user";

export class UserApp {
  getUserByEmail = async (email: string) => {
    const result = await store.userStore().getUserByEmail(email);
    if (!result) {
      throw new AppError(
        `${where}.get_user_by_email`,
        "Không tìm thấy email tương ứng",
        StatusCodes.NOT_FOUND,
        ""
      );
    }
    return result;
  };

  getUserList = async (payload: IPayloadGetUser, roleLevel: number) => {
    try {
      const [data, totalData] = await Promise.all([
        await store.userStore().getUserList(payload, roleLevel),
        await store.userStore().countUserList(payload, roleLevel),
      ]);

      return {
        data: data || [],
        totalData: totalData || 0,
      };
    } catch (error: any) {
      throw new AppError(
        "App.user.getUserList",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };

  checkExistEmail = async (email: string) => {
    const checkExistEmail = await store
      .userStore()
      .checkExistEmail(replaceTrimString(email).toLowerCase());
    if (checkExistEmail.exist) {
      throw new AppError(
        "App.user.addUser",
        "Email đã tồn tại, vui lòng thử lại",
        StatusCodes.BAD_REQUEST
      );
    }

    return "pass";
  };

  addUser = async (user: IUser, userActionId: string) => {
    UserModel.prevSave(user);
    this.checkExistEmail(user.email);

    const userDefault: IUser = {
      name: "",
      description: "",

      email: "",
      password: "",
      phoneNumber: "",
      roleId: "",

      emailVerified: false,
      lastPasswordUpdate: null,

      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const newUser: IUser = Object.assign(userDefault, {
      ...user,
      email: replaceTrimString(user.email),
      name: replaceTrimString(user.name),
    });
    const [err, userId] = await to(
      store.userStore().addUser(UserModel.prevSave(newUser))
    );

    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.addUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    const [errorGetRole, role] = await to(
      new RoleApp().getById(newUser.roleId as string)
    );

    if (!_.isEmpty(errorGetRole)) throw errorGetRole;

    const token = new TokenModel().generateToken(40);

    const days = 2;
    const date = new Date();
    date.setDate(date.getDate() + days);

    const userToken: IToken = {
      createdAt: new Date(),
      type: "verify_email",
      token,
      expiredAt: date,
      detail: {
        userId: new ObjectId(userId),
        email: replaceTrimString(user.email).toLowerCase(),
      },
    };

    await new TokenApp().create(userToken);

    const link = `http://localhost:3000/change_password?token=${token}&email=${replaceTrimString(
      user.email
    ).toLowerCase()}&id=${userId}`;

    const sendMailInfo = {
      receivers: replaceTrimString(user.email).toLowerCase(),
      subject: "[TLuxury] Thay đổi thông tin người dùng",
      htmlBody: `<a href=${link}>Xác thực tài khoản</a>`,
    };

    new Mailer().sendMessage(
      sendMailInfo.receivers,
      sendMailInfo.subject,
      sendMailInfo.htmlBody
    );

    return "OK";
  };

  getByRoleId = async (roleId: string) => {
    const [err, result] = await to(store.userStore().getByRoleId(roleId));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.getByRoleId",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }
    return result;
  };

  deleteUserByRoleId = async (roleId: string) => {
    const [errGetUser, userOfRole] = await to(this.getByRoleId(roleId));

    if (!_.isEmpty(errGetUser)) throw errGetUser;

    const [err] = await to(store.userStore().deleteUserByRoleId(roleId));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.deleteUserByRoleId",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    return "OK";
  };

  getById = async (userId: string) => {
    const [err, result] = await to(store.userStore().getById(userId));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.getById",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    if (result && !result.id) {
      throw new AppError(
        "app.user.getById.checkUser",
        "Người dùng không tồn tại hoặc đã bị xóa",
        StatusCodes.NOT_FOUND
      );
    }

    return result;
  };

  updateUser = async (userId: string, user: IUser, userActionId: string) => {
    const [err] = await to(store.userStore().updateUser(userId, user));
    const [UGetUser, userDB] = await to(this.getById(userActionId));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.updateUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    const newUser = await this.getById(userId);

    return newUser;
  };

  deleteUser = async (userId: string, userActionId: string) => {
    const [error, user] = await to(this.getById(userId));

    if (!_.isEmpty(error)) throw error;

    await store
      .userStore()
      .deleteUser(userId)
      .catch((error) => {
        console.log("Lỗi DeleteUser ==> ", error);

        throw new AppError(
          "app.validate.deleteUser",
          "Xóa người dùng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });
  };

  verifyAndUpdatePassword = async (
    userId: string,
    token: string,
    email: string,
    password: string
  ) => {
    const [error, result] = await to(new TokenApp().getByToken(token, userId));
    if (!_.isEmpty(error)) throw error;

    if (result && result.type === "verify_email") {
      const [err] = await to(this.verifyEmail(email));

      if (!_.isEmpty(err)) throw err;
    }

    const [errUpdatePassword] = await to(
      this.updateNewPassword(userId, password)
    );
    if (!_.isEmpty(errUpdatePassword)) throw errUpdatePassword;

    await new TokenApp().deleteToken(token);

    return;
  };

  updateNewPassword = async (userId: string, password: string) => {
    const newPassword = await new UserModel().hashPassword(password);

    const [err, result] = await to(
      store.userStore().updatePassword(userId, newPassword)
    );

    if (!_.isEmpty(err)) {
      throw new AppError(
        "app.updateNewPassword",
        "Cập nhật mật khẩu thất bại",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    return result;
  };

  verifyEmail = async (email: string) => {
    const [err] = await to(store.userStore().verifyEmail(email));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "app.user.verifyEmail",
        "Xác thực email thất bại",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }
    return;
  };

  sendTokenForgotPassword = async (userId: string, email: string) => {
    const token = new TokenModel().generateToken(40);

    const hour = 2;
    const date = new Date();
    date.setHours(date.getHours() + hour);

    const userToken: IToken = {
      createdAt: new Date(),
      type: "forgot_password",
      token,
      expiredAt: date,
      detail: {
        userId: new ObjectId(userId),
        email: replaceTrimString(email),
      },
    };

    await new TokenApp().create(userToken);

    const link = `http://localhost:3000/change_password?token=${token}&email=${replaceTrimString(
      email
    )}&id=${userId}`;

    const sendEmailInfo = {
      receivers: email,
      subject: "[TLuxury] Quên mật khẩu",
      htmlBody: `<a href=${link}>Thay đổi mật khẩu</a>`,
    };

    new Mailer().sendMessage(
      sendEmailInfo.receivers,
      sendEmailInfo.subject,
      sendEmailInfo.htmlBody
    );

    return;
  };

  sendTokenActiveEmail = async (userId: string, email: string) => {
    try {
      const token = new TokenModel().generateToken(40);

      const days = 2;
      const date = new Date();
      date.setDate(date.getDate() + days);

      const userToken: IToken = {
        createdAt: new Date(),
        type: "verify_email",
        token,
        expiredAt: date,
        detail: {
          userId: new ObjectId(userId),
          email,
        },
      };

      await new TokenApp().create(userToken);

      const link = `http://localhost:3000/change_password?token=${token}&email=${replaceTrimString(
        email
      )}&id=${userId}`;

      const sendEmailInfo = {
        receivers: email,
        subject: "[TLuxury] Xác thực email",
        htmlBody: `<a href=${link}>Xác thực tài khoản</a>`,
      };

      new Mailer().sendMessage(
        sendEmailInfo.receivers,
        sendEmailInfo.subject,
        sendEmailInfo.htmlBody
      );

      return "OK";
    } catch (error: any) {
      throw new AppError(
        "app.user.sendTokenActiveEmail",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };

  checkCorrectPassword = async (userId: string, password: string) => {
    const user = await store
      .userStore()
      .getById(userId, { _id: 0, password: 1, id: "$_id" })
      .catch((err) => {
        throw new AppError(
          "app.user.checkCorrectPassword",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          err.message
        );
      });

    if (_.isEmpty(user)) {
      throw new AppError(
        "app.user.checkCorrectPassword.getById",
        "Người dùng đã được xóa hoặc không tồn tại",
        StatusCodes.NOT_FOUND
      );
    }

    const isErrorCheckPassword =
      await new AuthenticationApp().checkUserPassword(user as IUser, password);

    if (isErrorCheckPassword) return false;
    return true;
  };

  changePhoneNumber = async (userId: string, phoneNumber: string) => {
    const [error] = await to(
      store.userStore().changePhoneNumber(userId, phoneNumber)
    );

    if (!_.isEmpty(error)) {
      throw new AppError(
        "app.user.changePhoneNumber",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }

    return "OK";
  };

  getUserBySession = async (token: string) => {
    const [error, userSession] = await to(new SessionApp().getSession(token));

    if (!_.isEmpty(error)) throw error;

    const userId = userSession?.userId || "";

    const [errorUser, user] = await to(this.getById(userId));

    if (!_.isEmpty(errorUser)) throw errorUser;

    return user;
  };

  getListUserIdOfAdminUser = async () => {
    const roleIdList = await new RoleApp()
      .getRoleIdListOfAdminRole()
      .catch((error) => {
        throw new AppError(
          "app.user.changePhoneNumber",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    const [errorGetIds, userIdList] = await to(
      store.userStore().getUserIdListByListRoleId(roleIdList || [])
    );

    if (!_.isEmpty(errorGetIds)) {
      throw new AppError(
        "app.user.getListUserIdOfAdminUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        errorGetIds.message
      );
    }

    return userIdList;
  };

  getListUserIdByPermission = async (permission: string) => {
    try {
      return await store.roleStore().getListUserIdByPermission(permission);
    } catch (error: any) {
      throw new AppError(
        "app.user.getListUserIdByPermission",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };
}
