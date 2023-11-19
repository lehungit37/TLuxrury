import { IPayloadNotification } from 'src/types/notification';

export const idNotification = 'common.routes.notification';
export const initPayloadNotification: IPayloadNotification = {
  after: '',
  limit: 20,
  type: '',
  placeOfOrigin: [],
};

export const SOURCE_NOTIFICATION = {
  SystemManagement: 'Quản lý hệ thống',
  UserManagement: 'Quản lý người dùng',
  CustomerManagement: 'Quản lý khách hàng',
  CameraManagement: 'Quản lý camera',
  StationManagement: 'Quản lý trạm',
  PersonDetectionAi: 'Phát hiện người lạ',
  Record: 'Record',
  Stream: 'Trực tiếp',
  AiEvent: 'AI Event',
  Publisher: 'Publisher',
  OtherSource: 'Thông báo khác',
};

export const SOURCE_NOTIFICATION_ITEM = {
  sound: 'Thông báo âm thanh',
  webNotification: 'Thông báo qua web',
  emailNotification: 'Thông báo qua email',
  mobileNotification: 'Thông báo qua điện thoại',
  zaloNotification: 'Thông báo qua zalo',
};
