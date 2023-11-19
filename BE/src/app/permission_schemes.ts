import { StatusCodes } from "http-status-codes";
import { to } from "await-to-js";
import _ from "lodash";
import store from "../stores";
import { AppError } from "../models/util";
export class PermissionSchemesApp {
  getByRoleLevel = async (roleLevel: number) => {
    const [error, result] = await to(
      store.permissionSchemesStore().getByRoleLevel(roleLevel)
    );

    if (!_.isEmpty(error)) {
      throw new AppError(
        "App.user.addUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }

    return result;
  };

  getRoleListOfUser = async (permission: string[], isGetAll: boolean) => {
    const [err, result] = await to(
      store.permissionSchemesStore().getRouteList(permission, isGetAll)
    );

    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.getRoleListOfUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    return result;
  };
}
