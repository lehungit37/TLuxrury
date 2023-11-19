import { EPermission } from "./../interface/enum";
import { SessionApp } from "./session";
import { to } from "await-to-js";
import { StatusCodes } from "http-status-codes";

import { IUser } from "../interface/user";
import { UserModel } from "../models/user";
import { AppError } from "../models/utils";
import { UserApp } from "./user";
import _ from "lodash";
import { RoleApp } from "./role";

export class AuthenticationApp {
  checkUserPassword = async (user: IUser, password: string) => {
    const userModel = new UserModel();

    const bool = await userModel.comparePassword(user.password, password);

    if (!bool)
      return new AppError(
        "checkUserPassword",
        "Mật khẩu không chính xác",
        StatusCodes.UNAUTHORIZED
      );
  };

  checkPasswordAndAllCriteria = async (user: IUser, password: string) => {
    let error = await this.checkUserPassword(user, password);
    if (error) return error;
  };

  authenticateUser = async (user: IUser, password: string) => {
    let error = await this.checkPasswordAndAllCriteria(user, password);
    if (error) return { error };

    return { user };
  };

  checkPermissionUser = async (
    userId: string,
    permissionName: string,
    token: string
  ) => {
    const [errorSession] = await to(new SessionApp().getSession(token));

    if (!_.isEmpty(errorSession)) {
      throw errorSession;
    }

    const role = await new RoleApp().getRoleByUserId(userId);

    let permissionNameParse = permissionName;

    // if (permissionNameParse === EPermission.PUBLIC) return role;

    // if (
    //   permissionNameParse === EPermission.LIST_CAMERA ||
    //   permissionNameParse === EPermission.UPLOAD_VIDEO ||
    //   permissionNameParse === EPermission.GET_VIDEOS ||
    //   permissionNameParse === EPermission.DELETE_VIDEOS ||
    //   permissionNameParse === EPermission.BACKUP_VIDEOS
    // ) {
    //   permissionNameParse = EPermission.CONFIG_CAMERA;
    // }

    const { level, permissions } = role;

    if (level !== 0) {
      if (!permissions.includes(permissionNameParse)) {
        throw new AppError(
          "App.AuthenticationApp.checkPermissionUser.checkPermission",
          "Người dùng không có quyền truy cập",
          StatusCodes.FORBIDDEN
        );
      }
    }
    return role;
  };
}
