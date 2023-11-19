import { EThresholdStatus } from './enum';

export type TMonitoringType = 'QTKK' | 'QTN' | string;
export interface ILatestData {
  id: string;
  address: string;
  data: IIndicatorLatestData[];
  envIndex: {
    value: number;
    updatedAt: string;
  } | null;
  isBrokenDevice: boolean;
  isDisconnect: boolean;
  hasOverThresholdIndicator: boolean;
  latestSentAt: string;
  monitoringType: string;
  monitoringGroup: string;
  confirmationStatus: boolean;
  name: string;
  rootLocation: string;
  monitoringTypeSymbol: TMonitoringType;
  battery: number;
}

export interface IIndicatorLatestData {
  indicator: string;
  indicatorName: string;
  isOverThreshold: boolean;
  status: EThresholdStatus;
  thresholdStatus: EThresholdStatus;
  sensorStatus: string;
  sentAt: string;
  unit: string;
  value: number;
  color: string;
}

export interface IPayloadGetLatestData {
  page: number;
  limit: number;
  monitoringType: string;
  monitoringGroup: string;
  district: string;
  confirmationStatus: string;
  searchKeyword: string;
}

export interface IGetDetailIndicatorLatestData {
  type:
    | 'NO_THRESHOLD'
    | 'THRESHOLD_BY_EVERY_TIME'
    | 'THRESHOLD_BY_EACH_HOUR'
    | 'THRESHOLD_BY_EACH_EIGHT_HOUR'
    | 'THRESHOLD_BY_EACH_DAY'
    | 'THRESHOLD_BY_RANGE';
  detail: {
    upperLimit: number;
    lowerLimit: number;
    thresholdRangeDescription?: string;
    safeRangeDescription?: string;
    description?: string;
    name?: string;
  }[];
  unit: string;
}
export interface IStationInfo {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  monitoringType: string;
  latestSentAt: string | null;
  monitoringGroup: string;
  stationImages: string[];
}
