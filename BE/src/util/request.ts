import { ObjectId } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { Request } from "express";

import { AppError } from "../models/util";

interface IParams {
  userId: string;
  authorization: string;
}

export const isValidId = (req: Request, idType: string) => {
  const paramId = req.params[idType] as string;

  if (!ObjectId.isValid(paramId))
    return {
      error: new AppError(
        `Util.validate.isValidId`,
        `${idType} Không hợp lệ`,
        StatusCodes.BAD_REQUEST,
        ""
      ),
    };

  return { paramId };
};

export const isValidAuth = (req: Request) => {
  const authorization = req.headers.authorization as string;

  if (!authorization)
    return {
      error: new AppError(
        `Util.validate.isValidId`,
        `Token Không hợp lệ`,
        StatusCodes.BAD_REQUEST,
        ""
      ),
    };

  return { authorization };
};
