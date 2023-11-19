import _ from 'lodash';
import { ERoleLevel } from 'src/types/enum';
import { IUser } from 'src/types/user';

export const checkIsDefaultRole = (userInfo: IUser) => {
  if (!userInfo || _.isEmpty(userInfo)) return false;
  return (
    userInfo.role.level === ERoleLevel.SUPER_ADMIN ||
    userInfo.role.level === ERoleLevel.SYSTEM_ADMIN
  );
};

export const checkRenderRouteAndMenu = (me: IUser, permissionDefine: string[]) => {
  if (!checkIsDefaultRole(me)) {
    const { role } = me;

    const samePermissionList = _.intersection(role?.permissions, permissionDefine);

    if (samePermissionList.length) return true;
    return false;
  }

  return true;
};
