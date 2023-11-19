import {
  AccountBalanceOutlined,
  BusinessOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';

export enum EIndicatorThresholdTypes {
  NO_THRESHOLD = 'NO_THRESHOLD',
  THRESHOLD_BY_EVERY_TIME = 'THRESHOLD_BY_EVERY_TIME',
  THRESHOLD_BY_EACH_HOUR = 'THRESHOLD_BY_EACH_HOUR',
  THRESHOLD_BY_EACH_EIGHT_HOUR = 'THRESHOLD_BY_EACH_EIGHT_HOUR',
  THRESHOLD_BY_EACH_DAY = 'THRESHOLD_BY_EACH_DAY',
  THRESHOLD_BY_RANGE = 'THRESHOLD_BY_RANGE',
}

export enum ESortOptions {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export enum ECameraAction {
  CREATE = 'CREATE',
  SHARE_LINK = 'SHARE_LINK',
  UPDATE = 'UPDATE',
  CLOSE = 'CLOSE',
}

export enum ECameraStatus {
  NORMAL = 'normal',
  ERROR = 'error',
  WARNING = 'warning',
  OFFLINE = 'offline',
}

export const TypeThresholdOptions = [
  {
    value: EIndicatorThresholdTypes.NO_THRESHOLD,
    label: 'Không có ngưỡng chỉ số',
  },
  {
    value: EIndicatorThresholdTypes.THRESHOLD_BY_EVERY_TIME,
    label: 'Ngưỡng chỉ số theo mỗi lần gửi',
  },
  {
    value: EIndicatorThresholdTypes.THRESHOLD_BY_EACH_HOUR,
    label: 'Ngưỡng chỉ số theo giờ',
  },
  {
    value: EIndicatorThresholdTypes.THRESHOLD_BY_EACH_EIGHT_HOUR,
    label: 'Ngưỡng chỉ số theo 8 giờ',
  },
  {
    value: EIndicatorThresholdTypes.THRESHOLD_BY_EACH_DAY,
    label: 'Ngưỡng chỉ số theo ngày',
  },
  {
    value: EIndicatorThresholdTypes.THRESHOLD_BY_RANGE,
    label: 'Ngưỡng chỉ số theo khoảng',
  },
];

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const GenderOptions = [
  {
    value: EGender.MALE,
    label: 'Nam',
  },
  {
    value: EGender.FEMALE,
    label: 'Nữ',
  },
];

export enum EHostUnitTypes {
  GOVERNMENT = 'government',
  INDIVIDUAL = 'individual',
  ENTERPRISE = 'enterprise',
}
export const HostUnitOptions = [
  {
    value: EHostUnitTypes.GOVERNMENT,
    label: 'Nhà nước',
    icon: AccountBalanceOutlined,
    iconColor: 'error',
    slug: 'tochuc',
  },
  {
    value: EHostUnitTypes.INDIVIDUAL,
    label: 'Cá nhân',
    icon: PersonOutlineOutlined,
    iconColor: 'info',
    slug: 'canhan',
  },
  {
    value: EHostUnitTypes.ENTERPRISE,
    label: 'Doanh nghiệp',
    icon: BusinessOutlined,
    iconColor: 'primary',
    slug: 'tochuc',
  },
];

export enum EMethodTypes {
  FTP = 'FTP',
  HTTP = 'HTTP',
  LORA = 'LORA',
}

export enum ERoleLevel {
  SUPER_ADMIN = 0,
  SYSTEM_ADMIN = 1,
  SYSTEM_USER = 2,
}

export enum EFolderName {
  STATIONS = 'stations',
  ARTICLE = 'article',
}

export enum EStationEventTypes {
  DISCONNECTED = 'station_disconnected',
  CONNECTED = 'station_connected',
  WRONG_STRUCTURE = 'station_wrong_structure',
  OVER_THRESHOLD = 'station_over_threshold',
  DEFECTIVE_DEVICE = 'station_defective_device',
}

export type TPalateColor =
  | 'inherit'
  | 'disabled'
  | 'info'
  | 'warning'
  | 'error'
  | 'action'
  | 'success'
  | 'primary'
  | 'secondary'
  | undefined;

export enum EMinistryCycleTypes {
  EVERY_HOUR = 'EVERY_HOUR',
  EVERY_SENDING_TIME = 'EVERY_SENDING_TIME',
}

export enum EThresholdStatus {
  NO_THRESHOLD = 'NO_THRESHOLD', //xanh la
  OVER_THRESHOLD = 'OVER_THRESHOLD', // do
  NORMAL = 'NORMAL', // xanh la
  UNCONFIG_THRESHOLD = 'UNCONFIG_THRESHOLD', // xanh lam
  WRONG_UNIT = 'WRONG_UNIT', // cam
  BROKEN_DEVICE = 'BROKEN_DEVICE', // xam
}
