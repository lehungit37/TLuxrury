import bcryptjs from "bcryptjs";

import {
  validateEmail,
  validatePhoneNumber,
  isObjectId,
} from "./../util/validate";
import { IErrors } from "./../interface/errors";
import { IPayloadGetUser, IUser } from "./../interface/user";
import { pushError } from "./utils";

export class UserModel {
  static validateGetUser = async (payload: IPayloadGetUser) => {
    const errors: IErrors = <IErrors>{};

    if (payload.limit > 50 || payload.limit <= 0) {
      errors.limit = pushError({
        id: "user.validate.format.limit",
        message: "Limit phải từ 0 => 50",
      });
    }

    if (payload.page < 1) {
      errors.limit = pushError({
        id: "user.validate.format.page",
        message: "Page phải lớn hơn 0",
      });
    }

    return errors;
  };

  static validateAddUser = async (user: IUser) => {
    const errors: IErrors = <IErrors>{};
    if (!isObjectId(user.roleId as string)) {
      errors.roleId = pushError({
        id: "user.validate.required.roleId",
        message: "Vai trò không dúng định dạng",
      });
    }
    if (!user.name) {
      errors.name = pushError({
        id: "user.validate.required.name",
        message: "Vui lòng nhập tên người dùng",
      });
    }
    if (!user.email) {
      errors.email = pushError({
        id: "user.validate.required.email",
        message: "Vui lòng nhập email",
      });
    }

    if (!validateEmail(user.email)) {
      errors.email = pushError({
        id: "user.validate.format.email",
        message: "Email không đúng định dạng",
      });
    }

    if (user.phoneNumber && !validatePhoneNumber(user.phoneNumber)) {
      errors.phoneNumber = pushError({
        id: "user.validate.format.phoneNumber",
        message: "Số điện không đúng định dạng",
      });
    }
    return errors;
  };

  static validateUpdateUser = async (user: IUser) => {
    const errors: IErrors = <IErrors>{};
    if ("roleId" in user && !isObjectId(user.roleId as string)) {
      errors.roleId = pushError({
        id: "user.validate.required.roleId",
        message: "Vai trò không dúng định dạng",
      });
    }
    if ("name" in user && !user.name) {
      errors.name = pushError({
        id: "user.validate.required.name",
        message: "Vui lòng nhập tên người dùng",
      });
    }

    if ("email" in user && user.email) {
      errors.email = pushError({
        id: "user.validate.required.email",
        message: "Không thể thay đổi email",
      });
    }
    if (
      "phoneNumber" in user &&
      user.phoneNumber &&
      !validatePhoneNumber(user.phoneNumber)
    ) {
      errors.phoneNumber = pushError({
        id: "user.validate.format.phoneNumber",
        message: "Số điện không đúng định dạng",
      });
    }
    return errors;
  };

  static validatePassword = async (password: string) => {
    const errors: IErrors = <IErrors>{};

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const chart = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (password.length < 8) {
      errors.length = pushError({
        id: "password.validate.format.length",
        message: "Mật khẩu có độ dài ít hơn 8 ký tự",
      });
    }
    if (!lowerCaseLetters.test(password)) {
      errors.lowerCaseLetters = pushError({
        id: "password.validate.format.lowerCaseLetters",
        message: "Mật khẩu không chứa ký tự thường",
      });
    }
    if (!upperCaseLetters.test(password)) {
      errors.upperCaseLetters = pushError({
        id: "password.validate.format.upperCaseLetters",
        message: "Mật khẩu không chứa ký tự in hoa",
      });
    }
    if (!numbers.test(password)) {
      errors.numbers = pushError({
        id: "password.validate.format.numbers",
        message: "Mật khẩu không chứa ký tự số",
      });
    }
    if (!chart.test(password)) {
      errors.chart = pushError({
        id: "password.validate.format.chart",
        message: "Mật khẩu không chứa ký tự đặc biệt",
      });
    }
    return errors;
  };

  hashPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  };

  comparePassword = async (hash: string, password: string) => {
    const bool = await bcryptjs.compare(password, hash);
    return bool;
  };

  static validateUpdateMyPassword = async (payload: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const errors: IErrors = <IErrors>{};
    const { newPassword, oldPassword } = payload;
    if (!oldPassword) {
      errors.oldPassword = pushError({
        id: "user.validate.required.oldPassword",
        message: "Mật khẩu cũ không được để trống",
      });
    }

    if (!newPassword) {
      errors.newPassword = pushError({
        id: "user.validate.required.oldPassword",
        message: "Mật khẩu mới không được để trống",
      });
    }

    return errors;
  };

  static prevSave = (user: IUser) => {
    user.email = user.email.toLowerCase();
    return user;
  };
}
