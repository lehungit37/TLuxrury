import {
  Map,
  MapOutlined,
  SettingsInputComposite,
  PinDrop,
  VideoSettings,
  Groups2Outlined,
  Groups,
  AnnouncementOutlined,
  HomeOutlined,
  Home,
  LocalDrink,
  LocalDrinkOutlined,
  CreateOutlined,
  Create,
  RequestPageOutlined,
  RequestPage,
  SyncAlt,
  SaveAlt,
  Tune,
  UpgradeOutlined,
  Upgrade,
  ReportProblemOutlined,
  ReportProblem,
  PieChartOutlined,
  PieChart,
} from '@mui/icons-material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

import { CPath } from './path';
import { PermissionSchemes } from './role';
import { IMenuRoute } from 'src/types/route';

// import { ReactComponent as UserLog } from 'src/assets/svg/user_log.svg';
// import { ReactComponent as UserLogActive } from 'src/assets/svg/user_log_active.svg';
// import { ReactComponent as Api } from 'src/assets/svg/api.svg';
import { ReactComponent as RoleIcon } from 'src/assets/icons/menu_role.svg';
import { ReactComponent as BookingIcon } from 'src/assets/icons/menu_booking.svg';
import { ReactComponent as BookingActiveIcon } from 'src/assets/icons/menu_booking_active.svg';
import { ReactComponent as PaymentIcon } from 'src/assets/icons/menu_payment.svg';
import { ReactComponent as RoomIcon } from 'src/assets/icons/menu_room.svg';

import config from 'src/config';
import { IRole } from 'src/types/role';
import { ERoleLevel } from 'src/types/enum';

export const CMenuList: IMenuRoute[] = [
  {
    title: 'Trang chủ',
    path: CPath.home,
    icon: HomeOutlined,
    activeIcon: Home,
    // permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
  {
    title: 'Đặt phòng',
    path: CPath.bookingManagement,
    icon: BookingIcon,
    activeIcon: BookingActiveIcon,
    // permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
  {
    title: 'Quản lý phòng',
    path: CPath.rooManagement,
    icon: RoomIcon,
    activeIcon: RoomIcon,
    // permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
  {
    title: 'Thống kê',
    path: CPath.revenueManagement,
    icon: PieChartOutlined,
    activeIcon: PieChart,
    // permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
  {
    title: 'Quản lý người dùng',
    path: CPath.userManagement,
    icon: Groups2Outlined,
    activeIcon: Groups,
    permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
  {
    title: 'Quản lý vai trò',
    path: CPath.roleManagement,
    icon: RoleIcon,
    activeIcon: RoleIcon,
    permission: [PermissionSchemes.getListUser],
    isShow: true,
    isExpandSetting: false,
  },
];

const permissionsExpanded = CMenuList.reduce<string[]>((result, item) => {
  if (item.isExpandSetting) {
    const permission = item?.permission || [];
    return result.concat(permission);
  } else {
    return result;
  }
}, []);

export const checkPermissionExpanded = (role: IRole | null) => {
  if (config.systemName === 'STTTT') return false;

  if (!role) return false;

  if (role.level === ERoleLevel.SUPER_ADMIN || role.level === ERoleLevel.SYSTEM_ADMIN) return true;

  return (
    role.permissions.filter((permission) => permissionsExpanded.includes(permission)).length > 0
  );
};
