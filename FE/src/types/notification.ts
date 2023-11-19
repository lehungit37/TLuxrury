import { MutableRefObject } from 'react';

export type TLevelNotification = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'CRITICAL';

export type TNotificationSource =
  | 'SystemManagement'
  | 'UserManagement'
  | 'CameraManagement'
  | 'CustomerManagement'
  | 'StationManagement'
  | 'PersonDetectionAi'
  | 'Record'
  | 'Publisher'
  | 'OtherSource'
  | 'AiEvent';

export type TNotificationSourceItem =
  | 'sound'
  | 'emailNotification'
  | 'mobileNotification'
  | 'webNotification'
  | 'zaloNotification';

export interface INotification {
  id: string;
  level: TLevelNotification;
  // source: 'CAMERA' | 'USER' | 'SYSTEM' | 'RECORD' | 'STREAM';
  source: any;
  type: string;
  title: {
    content: string;
    data: object;
  };
  description: {
    content: string;
    data: object;
  };
  time: string;
  isRead: boolean;
  isSeen: boolean;
  placeOfOrigin: TNotificationSource;
  data: {
    eventId?: string;
  };
}

export interface IPayloadNotification {
  after: string;
  limit: number;
  type: string;
  placeOfOrigin: string[];
}

export interface IFilterSourceNotification {
  id: 'CAMERA' | 'USER' | 'SYSTEM' | 'RECORD' | 'STREAM';
  value: string;
}

export interface INotificationType {
  id: string;
}

export type TAudioSoundType = 'info' | 'warning' | 'error' | 'critical';

export type TAudioButton = {
  id: TAudioSoundType;
  name: string;
  source: string;
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  audioRef: MutableRefObject<HTMLAudioElement | null>;
};

interface INotificationSoundLevel {
  status: boolean;
  soundRingtone: string;
}

export type INotificationLevel = {
  [x in TAudioSoundType]: INotificationSoundLevel;
};

export interface INotINotificationSourceStatus {
  sound: boolean;
  webNotification: boolean;
  emailNotification: boolean;
  mobileNotification: boolean;
  zaloNotification: boolean;
  title: string;
}
export interface INotificationSource extends INotINotificationSourceStatus {
  source: TNotificationSource;
}

export interface INotificationSetting {
  _id: string;
  userId: string;
  notificationLevels: INotificationLevel;
  notificationSources: INotificationSource[];
  popupStatus: boolean;
}

export interface IChangeNotificationSound {
  data: {
    notificationLevel: any;
  };
}

export interface IChangeNotificationSource {
  data: {
    notificationSource: INotificationSource;
  };
}

export interface IChangePopupStatus {
  data: {
    popupStatus: boolean;
  };
}
