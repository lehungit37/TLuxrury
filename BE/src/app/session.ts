import { config } from "./../config/index";
import { to } from "await-to-js";
import { StatusCodes } from "http-status-codes";

import { ErrNotFound } from "../stores/errors";
import { isExpired, SessionModel } from "../models/session";
import { AppError } from "../models/util";
import store from "../stores";
import _ from "lodash";

const where = "app.validate.session";

export class SessionApp {
  getSession = async (token: string) => {
    const session = await store
      .sessionStore()
      .get(token)
      .catch((error) => {
        if (error instanceof ErrNotFound)
          throw new AppError(
            `${where}.get_sessions`,
            "Session không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại",
            StatusCodes.NOT_FOUND
          );
        throw new AppError(
          `${where}.get_sessions`,
          "Tìm kiếm Session thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    if (!session || (session && isExpired(session.exPiresAt))) {
      throw new AppError(
        `${where}.get_sessions`,
        "Session hết hạn",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return session;
  };

  getSessions = async (userId: string) => {
    const sessions = await store
      .sessionStore()
      .getSessions(userId)
      .catch((error) => {
        throw new AppError(
          `${where}.get_sessions`,
          "Lấy danh sách session thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });

    return sessions;
  };

  createSession = async (session: SessionModel) => {
    session.token = "";
    const result = await store
      .sessionStore()
      .create(session)
      .catch((error) => {
        throw new AppError(
          `${where}.create_session`,
          "Tạo session thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });
    return result;
  };

  deleteSession = async (sessionId: string) => {
    const result = await store
      .sessionStore()
      .delete(sessionId)
      .catch((error) => {
        throw new AppError(
          `${where}.delete_session`,
          "Xóa session thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });
    return result;
  };

  updateExpiresAt = async (sessionId: string, date: Date) => {
    const result = await store
      .sessionStore()
      .updateExpiresAt(sessionId, date)
      .catch((error) => {
        throw new AppError(
          `${where}.extend_session_expiration_time`,
          "Cập nhật expiresAt thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        );
      });
    return result;
  };

  revokeAllSessionOfUser = async (userId: string) => {
    const [error] = await to(
      store.sessionStore().revokeAllSessionOfUser(userId)
    );

    if (!_.isEmpty(error)) {
      throw new AppError(
        `${where}.revokeAllSessionOfUser`,
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return { message: "OK" };
  };
  revokeOneSessionOfUser = async (userId: string, sessionId: string) => {
    const [error] = await to(
      store.sessionStore().revokeOneSessionOfUser(userId, sessionId)
    );

    if (!_.isEmpty(error)) {
      throw new AppError(
        `${where}.revokeOneSessionOfUser`,
        "Lỗi hệ thống",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    return { message: "OK" };
  };
}
