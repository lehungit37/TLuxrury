// import { apiSessionRequired } from '../handler';
import { PermissionSchemesApp } from "../../app/permission_schemes";
import { IRouter, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../models/util";

export const permissionRouter = (router: IRouter) => {
  router.get("/permissions/:privateLevel", getPermissionByPrivateLevel);
};

const getPermissionByPrivateLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { privateLevel } = req.params;

    const level = Number(privateLevel);

    if (!(level <= 2 && level >= 0)) {
      throw new AppError(
        "api.router.getPermissionByPrivateLevel",
        "Thông tin không hợp lệ",
        StatusCodes.BAD_REQUEST,
        ""
      );
    }

    const result = await new PermissionSchemesApp().getByRoleLevel(level);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
