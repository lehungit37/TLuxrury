import { isExpired } from "./../models/session";
import { ErrNotFound } from "../stores/errors";
import { StatusCodes } from "http-status-codes";
import store from "../stores";
import { to } from "await-to-js";
import { IToken } from "../interface/token";
import _ from "lodash";
import { AppError } from "../models/util";

const where = "app.token";
export class TokenApp {
  create = async (data: IToken) => {
    const [error, result] = await to(store.tokenStore().create(data));

    if (!_.isEmpty(error)) {
      throw new AppError(
        "app.token.create",
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return result;
  };

  getByToken = async (token: string, userId: string) => {
    const tokens = await store
      .tokenStore()
      .getByToken(token, userId)
      .catch((error) => {
        console.log({ error });

        if (error instanceof ErrNotFound)
          throw new AppError(
            `${where}.get_sessions`,
            "Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại",
            StatusCodes.NOT_FOUND
          );
        throw new AppError(
          `${where}.get_sessions`,
          "Tìm kiếm Token thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    if (isExpired(tokens.expiredAt)) {
      throw new AppError(
        `${where}.get_tokens`,
        "Token hết hạn",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return tokens;
  };

  deleteToken = async (token: string) => {
    const result = await store
      .tokenStore()
      .delete(token)
      .catch((error) => {
        throw new AppError(
          `${where}.delete_token`,
          "Xóa token thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });
    return result;
  };
}
