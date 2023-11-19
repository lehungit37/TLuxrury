import to from "await-to-js";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { ERoleLevel } from "../interface/enum";
import { IErrors } from "../interface/errors";
import { IPayloadGetRole, IRole } from "../interface/role";
import { AppError, pushError } from "../models/util";
import store from "../stores";
import { replaceTrimString } from "../util/function";
import { UserApp } from "./user";

export class RoleApp {
  checkExitsRoleByName = async (name: string) => {
    const result = await store
      .roleStore()
      .checkExitsRoleByName(name)
      .catch((error) => {
        throw new AppError(
          "App.user.addUser",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return result;
  };

  getListRole = async (query: IPayloadGetRole, roleLevel: number) => {
    try {
      const totalData = await store.roleStore().countRoleList(query, roleLevel);
      const data = await store.roleStore().getListRole(query, roleLevel);

      return {
        totalData: totalData || 0,
        data: data || [],
      };
    } catch (error: any) {
      console.log({ error });

      throw new AppError(
        "App.user.addUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    }
  };

  addRole = async (role: IRole, userActionId: string) => {
    const isExistName = await this.checkExitsRoleByName(
      replaceTrimString(role.name)
    );
    if (isExistName.exist) {
      const errors: IErrors = <IErrors>{};

      errors.name = pushError({
        id: "user.validate.required.name",
        message: "Tên nhóm quyền đã tồn tại",
      });

      throw new AppError(
        "api.router.addRole",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errors
      );
    }

    if (_.isEmpty(role.permissions)) {
      throw new AppError(
        "api.router.addRole",
        "Quyền người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const roleDefault: IRole = {
      name: "",
      builtIn: false,
      level: ERoleLevel.USER,
      description: "",
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const newRole = Object.assign(roleDefault, {
      ...role,
      name: replaceTrimString(role.name),
    });

    const id = await store
      .roleStore()
      .addRole(newRole)
      .catch((err) => {
        throw new AppError(
          "App.user.addRole",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          err.message
        );
      });

    let userActionName = "";

    const roleAdded = await this.getById(id);

    return roleAdded;
  };

  getById = async (id: string) => {
    const result = await store
      .roleStore()
      .getById(id)
      .catch((err) => {
        throw new AppError(
          "App.role.roleStore",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          err.message
        );
      });

    return result;
  };

  deleteRole = async (id: string, userActionId: string) => {
    const role = await this.getById(id);

    if (_.isEmpty(role)) {
      throw new AppError(
        "App.role.deleteRole",
        "Nhóm quyền đã được xóa hoặc không tồn tại",
        StatusCodes.NOT_FOUND
      );
    }

    if (role.builtIn) {
      throw new AppError(
        "App.role.deleteRole",
        "Không thể xóa nhóm quyền này",
        StatusCodes.BAD_REQUEST
      );
    }

    const [err] = await to(store.roleStore().deleteRole(id));
    await to(store.userStore().deleteUserByRoleId(id));
    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.deleteRole",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    return "OK";
  };

  updateRole = async (roleId: string, newRole: IRole, userActionId: string) => {
    const role = await this.getById(roleId);

    if (_.isEmpty(role)) {
      throw new AppError(
        "App.user.deleteRole",
        "Nhóm quyền đã được xóa hoặc không tồn tại",
        StatusCodes.NOT_FOUND
      );
    }

    if (role.builtIn) {
      throw new AppError(
        "App.user.deleteRole",
        "Không thể chỉnh sửa nhóm quyền này",
        StatusCodes.BAD_REQUEST
      );
    }

    const isExistName = await this.checkExitsRoleByName(
      replaceTrimString(newRole.name)
    );

    if (isExistName.exist && isExistName.id.toString() !== roleId) {
      const errors: IErrors = <IErrors>{};

      errors.name = pushError({
        id: "user.validate.required.name",
        message: "Tên nhóm quyền đã tồn tại",
      });

      throw new AppError(
        "api.router.addRole",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        "",
        errors
      );
    }

    if (!newRole.permissions || _.isEmpty(newRole.permissions)) {
      throw new AppError(
        "api.router.addRole",
        "Quyền người dùng không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const [err] = await to(
      store.roleStore().updateRole(roleId, {
        ...newRole,
        name: replaceTrimString(newRole.name),
      })
    );

    if (!_.isEmpty(err)) {
      throw new AppError(
        "App.user.updateRole",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        err.message
      );
    }

    const newRoleUpdated = await this.getById(roleId);

    return newRoleUpdated;
  };

  getUserListByRoleId = async (roleId: string) => {
    const role = await this.getById(roleId);

    if (_.isEmpty(role)) {
      throw new AppError(
        "App.role.getUserListByRoleId.getById",
        "Nhóm quyền đã được xóa hoặc không tồn tại",
        StatusCodes.BAD_REQUEST
      );
    }

    const result = await new UserApp().getByRoleId(roleId);

    return result;
  };

  getRoleByLevel = async (roleLevel: number) => {
    try {
      const result = await store.roleStore().getRoleByLevel(roleLevel);

      return result;
    } catch (error) {
      throw new AppError(
        "App.user.getRoleByLevel",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  getRoleIdListOfAdminRole = async () => {
    const [error, roleIdList] = await to(
      store.roleStore().getRoleIdListOfAdminRole()
    );

    if (!_.isEmpty(error)) {
      throw new AppError(
        "App.user.getRoleIdListOfAdminRole",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return roleIdList;
  };

  getRoleByUserId = async (userId: string) => {
    const user = await new UserApp().getById(userId).catch((error) => {
      throw new AppError(
        "App.AuthenticationApp.checkPermissionUser",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    });

    if (user && !user.id) {
      throw new AppError(
        "App.AuthenticationApp.checkPermissionUser.checkUser",
        "Người dùng đã được xóa hoặc không tìm thấy",
        StatusCodes.NOT_FOUND
      );
    }

    const role = await this.getById(user?.roleId).catch((error) => {
      throw new AppError(
        "App.AuthenticationApp.checkPermissionUser.checkRole",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    });

    if (!role || !role.id) {
      throw new AppError(
        "App.AuthenticationApp.checkPermissionUser.checkRole",
        "Nhóm quyền đã được xóa hoặc không tìm thấy",
        StatusCodes.NOT_FOUND
      );
    }

    return role;
  };
}
