import { AppError } from "./../../models/util";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SessionApp } from "../../app/session";

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

    const userId = session?.id?.toString();

    req.headers.user_id = userId;

    next();
  } catch (error) {
    next(error);
  }
};
