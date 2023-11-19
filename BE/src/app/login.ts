import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";

import store from "../stores";
import { IErrors } from "../interface/errors";
import { IUser } from "../interface/user";
import { AuthenticationApp } from "./authentication";
import {
  SessionModel,
  SessionPropPlatform,
  SessionPropBrowser,
  SessionPropOs,
  SessionPropsIp,
} from "../models/session";
import { SessionApp } from "./session";
import { getBrowserInfo } from "./user_agent";
import { AppError } from "../models/util";
import { Request } from "express";

const where = "app.validate.login";

export class LoginApp {
  authenticateUserForLogin = async (
    email: string,
    password: string
  ): Promise<{ user?: IUser; errors?: any }> => {
    let errors: IErrors = <IErrors>{};
    let user: IUser | null = null;

    user = await store.userStore().getUserByEmail(email);

    if (!user)
      return {
        errors: new AppError(
          `${where}.authenticate_user_for_login`,
          "Tài khoản hoặc mật khẩu không chính xác",
          StatusCodes.NOT_FOUND
        ),
      };

    if (!user.emailVerified) {
      return {
        errors: new AppError(
          `${where}.authenticate_user_for_login`,
          "Tài khoản chưa được xác thực, không thể truy cập hệ thống",
          StatusCodes.UNAUTHORIZED
        ),
      };
    }

    const result = await new AuthenticationApp().authenticateUser(
      user,
      password
    );

    if (result.error) {
      return { errors: result.error };
    }

    return { user };
  };

  login = async (user: IUser, deviceId: string, req: Request) => {
    const session = new SessionModel(user.id || "", deviceId);

    const {
      browserName = "",
      browserVersion = "",
      os = "",
      ip,
      platform,
    } = getBrowserInfo(req);

    session.addProp(SessionPropPlatform, platform);
    session.addProp(SessionPropOs, os);
    session.addProp(SessionPropBrowser, `${browserName}/${browserVersion}`);
    session.addProp(SessionPropsIp, ip);

    const result = await new SessionApp().createSession(session);

    return result.token;
  };
}
