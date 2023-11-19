import { EHostUnitTypes, EMethodTypes, EStationEventTypes } from './enum';
import { IIndicatorThreshold } from './indicators';

export interface IStation {
  id: string;
  name: string;
  monitoringTypeId: string;
  monitoringGroupId: string;
  provinceCode: number | '';
  districtCode: number | '';
  lat: number | null;
  lng: number | null;
  symbol: string;
  address: string;
  stationImages: string[];
  status?: EStationEventTypes;
  // status
  enablePublishDataStatus: boolean;
  activeStatus: boolean;
  autoApproveDataStatus: boolean;
  confirmationStatus: boolean;
  overThresholdAlertStatus: boolean;
  wrongStructureAlertStatus: boolean;
  disconnectionStatus: boolean;
  hasOrganicPollutionConcern: boolean;
  calculateEnvIndex: boolean;
  files: string[];
  hostUnit: {
    hostUnitType: EHostUnitTypes | ''; // "govement" | "individual" | "enterprise"
    name?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
    officeAddress?: string; // "govement" |  "enterprise" required
    deputy?: string; // "govement" |  "enterprise" required
    jobTitle?: string; // "govement" |  "enterprise" optional

    // Nhà nước "govement"
    organization?: string;

    // Cá nhân "individual"
    dateOfBirth?: Date;
    nationality?: string;
    job?: string;
    address?: string;
    citizenIdentification?: string;
    identificationLicenseDate?: Date;
    identificationLicensePlace?: string;

    // Doanh nghiệp "enterprise"
    businessCode?: string;
    registrationCertificateNumber?: string;
    certificateLicenseDate?: Date;
    certificateLicensePlace?: string;
  };
  sendingMethod: {
    status: boolean;
    method?: EMethodTypes; //"FTP" | "HTTP" | "MQTT"
    ftpFolder?: string;
    ftpFilename?: string;
    dataSendingFrequency?: number;
    disconnectionTime?: number;
    devUEI?: string;
    applicationId?: string;
    phoneNumber?: string;
  };
  statusSendDataToMinistry: boolean;
  sendDataToMinistry: {
    // status: boolean;
    ftpFilename?: string;
    ftpFolder?: string;
    host?: string;
    username?: string;
    password?: string;
    port?: number;
    sendingCycle: string;
  }[];
  indicators: {
    indicatorId: string;
    getByDefaultThreshold: boolean;
    customThreshold?: IIndicatorThreshold;
  }[];
  envIndex: {
    value: number;
    updatedAt: Date;
  } | null;
  syncDataInfo: {
    status: boolean;
    startAt: Date | null;
    endAt: Date | null;
  };

  battery?: number;

  monitoringType?: string;
  monitoringGroup?: string;
  totalIndicator?: number;
}

export type TStationInformation = Pick<
  IStation,
  | 'name'
  | 'provinceCode'
  | 'districtCode'
  | 'symbol'
  | 'address'
  | 'lat'
  | 'lng'
  | 'stationImages'
  | 'enablePublishDataStatus'
  | 'activeStatus'
  | 'autoApproveDataStatus'
  | 'confirmationStatus'
  | 'overThresholdAlertStatus'
  | 'wrongStructureAlertStatus'
  | 'disconnectionStatus'
  | 'hasOrganicPollutionConcern'
  | 'calculateEnvIndex'
>;

export type TStationHostUnit = Pick<IStation, 'hostUnit'>;
export type TStationMethod = Pick<
  IStation,
  'sendingMethod' | 'sendDataToMinistry' | 'statusSendDataToMinistry'
>;
export type TStationIndicators = Pick<
  IStation,
  'indicators' | 'monitoringGroupId' | 'monitoringTypeId'
>;
export type TStationDocument = Pick<IStation, 'files'>;

export interface IStationParams {
  searchKeyword?: string;
  monitoringType?: string;
  monitoringGroup?: string;
  district?: string;
  activeStatus?: string;
  confirmationStatus?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface IStationSearch {
  searchKeyword: string;
  monitoringType: string;
  monitoringGroup: string;
  district: string;
  confirmationStatus: string;
  status: string;
}

export interface IFilterStationState {
  searchKeyword: string;
  monitoringType: string[];
  monitoringGroup: string[];
  district: string[];
  confirmationStatus: string;
  status: string;
}

export interface IDocument {
  id: string;
  userId: string;
  parentId: string;
  name: string;
  objectType: 0 | 1;
  canDelete: boolean;
  mPath: string;
  mimetype: string;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStationLogs {
  id?: string;
  stationId: string;
  eventType: EStationEventTypes;
  eventTime: Date;
  title: string;
  details: {
    filename?: string;
    indicators?: string[];
  };
}
