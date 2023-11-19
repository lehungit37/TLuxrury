import { Moment } from 'moment';
import { ETimeType } from './common';
export interface IStatisticSearch {
  page?: number;
  limit?: number;
  search?: string;
  // startTime: string;
  // endTime: string;
}

export interface IPayloadGetAdvanceData {
  page: number;
  limit: number;
  startTime: string | Moment;
  endTime: string | Moment;
  dataType: 'HOUR' | 'MINUTE';
  stationId: string;
}

export interface IStationFilter {
  page?: number;
  limit?: number;
  monitoringType?: string;
  monitoringGroup?: string;
  searchKeyword?: string;
  status?: string;
  district?: string;
}

export interface IStationFilterForWrongStructure {
  stationId: string;
  startTime: string;
  endTime: string;
  page: number;
  limit: number;
}

export interface IStatisticStation {
  id?: string;
  symbol: string;
  name: string;
  stationType: string;
  firstDataSentAt: string;
  lastDataSentAt: string;
  indicators: string;
  dataSendingFrequency: string;
  senDataToMinistryStatus: string;
  hostUnitName: string;
  samplingStatus: string;
  connectedCameraStatus: string;
  confirmationStatus: string;
  manufacturingDate: string;
  firmwareVersion: string;
  note: string;
}

export interface IStatisticSurfaceWater {
  id?: number;
  name: string;
  parameters: string;
  unit: string;
  greatestConcentration: number;
  smallestConcentration: number;
  averageConcentration: number;
  limit: string;
  time: string;
  note: string;
}

export interface IAdvanceDataItem {
  startAt: string;
  endAt: string;
  id: string;
  name: string;
  data: { [key: string]: number };
  bucketId: string;
  approved: boolean;
  boolean: boolean;
  sentAt: string;
}

export interface IResponseGetAdvanceData {
  data: IAdvanceDataItem[];
  totalData: number;
}
export interface IResponseGetDataSheet {
  data: IDataSheet[];
  totalData: number;
}

export interface IStatisticWrongStructure {
  id: string;
  stationId: string;
  stationName: string;
  filename: string;
  wrongCause: string;
  description: string;
  createdAt: string;
}

export interface IResponseGetWrongStructureData {
  data: IStatisticWrongStructure[];
  totalData: number;
}

export interface IPayloadDataSheet {
  indicators: string[];
  dataType: 'HOUR' | 'DAY';
  startTime: Moment | Date | string;
  endTime: Moment | Date | string;
  page: number;
  limit: number;
}
export interface ISubmissionFilter {
  monitoringType: string;
  monitoringGroup: string;
  district: string;
  status: string;
  searchKeyword: string;
  confirmationStatus: string;
  time: string;
  timeType: ETimeType;
  page: number;
  limit: number;
}

export interface IDataSheet {
  stationId: string;
  id: string;
  name: string;
  startAt: Date | Moment;
  bucketId: string;

  endAt: Date | Moment;
  data: {
    [indicatorName: string]: IDataSheetIndicatorValue;
  };
}

export interface IDataSheetIndicatorValue {
  minValue: number;
  maxValue: number;
  sumValue: number;
  avgValue: number;
}
export interface ISubmission {
  id: string;
  name: string;
  symbol: string;
  address: string;
  monitoringType: string;
  monitoringGroup: string;
  totalApproval: number;
  totalSubmissions: number;
}

export interface ISubmissionResponse {
  data: ISubmission[];
  totalData: number;
}
