import { RoleApp } from "./../../app/role";
import { AppError } from "./../../models/util";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SessionApp } from "../../app/session";
import { ERoleLevel } from "../../interface/enum";

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        "api.middleware",
        "Phiên đăng nhập không hợp lệ",
        StatusCodes.FORBIDDEN,
        "Token chưa được đính kèm"
      );
    }

    const session = await new SessionApp().getSession(token);

    const userId = session?.userId?.toString();

    req.headers.user_id = userId;

    next();
  } catch (error) {
    next(error);
  }
};

export const checkPermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.headers.user_id || "";
      if (!userId) {
        throw new AppError(
          "middleware.checkPermission",
          "Id không hợp lệ",
          StatusCodes.FORBIDDEN
        );
      }

      const role = await new RoleApp().getRoleByUserId(userId as string);
      const permissions = role.permissions;

      if (
        role.level === ERoleLevel.SUPER_ADMIN ||
        permissions.includes(permission)
      ) {
        req.headers.level = role.level.toString();
        next();
        return;
      }

      throw new AppError(
        "middleware.checkPermission",
        "Người dùng không có quyền truy cập chức năng này",
        StatusCodes.FORBIDDEN
      );
    } catch (error) {
      next(error);
    }
  };
};
