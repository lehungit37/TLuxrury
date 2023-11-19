import { IRouter, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { RoleApp } from "../../app/role";
import { EPermission, ERoleLevel } from "../../interface/enum";
import { IPayloadGetRole, IRole } from "../../interface/role";
import { RoleModel } from "../../models/role";
import { AppError } from "../../models/util";
import { isObjectId } from "../../util/validate";

const level = ERoleLevel.SUPER_ADMIN;

export const roleRouter = (router: IRouter) => {
  router.post("/roles", getRoleList);
  router.post("/roles/add", addRole);
  router.get("/roles/:roleId", getById);
  router.get("/roles/:roleId/users", getUserByRoleId);
  router.put("/roles/:roleId", updateRole);
  router.delete("/roles/:roleId", deleteRole);
  router.get("/roles", getRoleByLevel);
};

const getRoleList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: IPayloadGetRole = req.body;

    // const { level } = await checkPermissionAndGetRoleUser(
    //   req,
    //   EPermission.GET_LIST_ROLE
    // );
    const data = await new RoleApp().getListRole(query, level);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const addRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role: IRole = req.body;
    const errorValidate = RoleModel.validateAddAndUpdateRole(role);
    const userActionId = req.headers.user_id as string;
    if (!_.isEmpty(errorValidate)) {
      throw new AppError(
        "api.router.addRole",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errorValidate
      );
    }

    // await checkPermissionAndGetRoleUser(req, EPermission.ADD_ROLE);
    const roleAdded = await new RoleApp().addRole(role, userActionId);
    res.json(roleAdded);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleId } = req.params;
    if (!isObjectId(roleId)) {
      throw new AppError(
        "api.router.getById",
        "Thông tin không hợp lệ",

        StatusCodes.BAD_REQUEST
      );
    }
    // await checkPermissionAndGetRoleUser(req, EPermission.GET_LIST_ROLE);

    const result = await new RoleApp().getById(roleId);
    res.json(result || {});
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleId } = req.params;
    const userActionId = req.headers.user_id as string;

    if (!isObjectId(roleId)) {
      throw new AppError(
        "api.router.addRole",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }
    // await checkPermissionAndGetRoleUser(req, EPermission.DELETE_ROLE);

    const result = await new RoleApp().deleteRole(roleId, userActionId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roleId } = req.params;
    const newRole = req.body;
    const userActionId = req.headers.user_id as string;

    if (!isObjectId(roleId)) {
      throw new AppError(
        "api.router.updateRole",
        "Thông tin id không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const errorValidate = RoleModel.validateAddAndUpdateRole(newRole);

    if (!_.isEmpty(errorValidate)) {
      throw new AppError(
        "api.router.updateRole",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errorValidate
      );
    }

    // await checkPermissionAndGetRoleUser(req, EPermission.UPDATE_ROLE);

    const result = await new RoleApp().updateRole(
      roleId,
      newRole,
      userActionId
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserByRoleId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;

    if (!roleId || !isObjectId(roleId)) {
      throw new AppError(
        "api.router.getUserByRoleId",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const userList = await new RoleApp().getUserListByRoleId(roleId);

    res.json(userList);
  } catch (error) {
    next(error);
  }
};
const getRoleByLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { level } = await checkPermissionAndGetRoleUser(
    //   req,
    //   EPermission.GET_LIST_ROLE
    // );

    const result = await new RoleApp().getRoleByLevel(level);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// const checkPermissionAndGetRoleUser = async (
//   req: Request,
//   permissionName: string
// ): Promise<{ userId: string; level: number }> => {
//   const user_id = req.headers.user_id;
//   const token = req.headers.authorization;
//   const [error, role] = await to(
//     new AuthenticationApp().checkPermissionUser(
//       user_id as string,
//       permissionName,
//       token
//     )
//   );

//   if (!_.isEmpty(error)) throw error;

//   return { userId: user_id as string, level: role.level };
// };
