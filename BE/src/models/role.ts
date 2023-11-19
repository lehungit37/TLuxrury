import { replaceTrimString } from "./../util/function";
import { pushError } from "./util";
import { IErrors } from "./../interface/errors";
import { IRole } from "./../interface/role";
export class RoleModel {
  static validateAddAndUpdateRole = (role: IRole) => {
    const errors: IErrors = <IErrors>{};
    if (!role.name || !replaceTrimString(role.name)) {
      errors.name = pushError({
        id: "role.validate.required.name",
        message: "Vui lòng nhập tên nhóm quyền",
      });
    }
    return errors;
  };
}
