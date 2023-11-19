import { EHostUnitTypes } from './enum';

export interface IPenalty {
  id?: string;
  stationId: string;
  stationName: string;
  stationSymbol: string;
  status: EPenaltyStatus;
  hostUnitType: EHostUnitTypes;
  error: EPenaltyError;
  errorReason?: string;
  solution?: {
    type: string;
    time: string;
  };
  detail?: any;
  sentAt?: Date;
  lastRecordedAt?: Date;
  // updatedAt?: Date;
}

export interface IPenaltyUpdate {
  errorReason?: string;
  solution?: {
    type: string;
    time: Date;
  };
  status?: EPenaltyStatus;
  sampleId?: string;
}

export enum EPenaltyStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

export enum EPenaltyError {
  OVER_THRESHOLD = 'OVER_THRESHOLD',
  DISCONNECT = 'DISCONNECT',
  WRONG_STRUCTURE = 'WRONG_STRUCTURE',
}

export enum EPenaltyErrorReason {
  TRANSMISSION_ERROR = 'TRANSMISSION_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  SYSTEM_TECHNICAL_ERROR = 'SYSTEM_TECHNICAL_ERROR',
  OVER_THRESHOLD_STATION = 'OVER_THRESHOLD_STATION',
}

export interface IPenaltySearch {
  page?: number;
  limit?: number;
  searchKeyword: string;
  status?: string;
  stationId?: string;
  error?: string;
  // time?: Moment;
  startDate?: string;
  endDate?: string;
}

export interface IPenaltyStatisticalSearch {
  error?: string;
  status?: string;
  startDate: string | null;
  endDate: string | null;
  stationId?: string;
}

export interface IPenaltyStatistical {
  time: string;
  wrongStructure: number;
  disconnect: number;
  overThreshold: number;
  total?: number;
}

export interface IPenaltyReport {
  host_unit?: string;
  tc_ten: string;
  tc_dc: string;
  tc_msdn: string;
  tc_gcn: string;
  tc_gcn_noicap: string;
  tc_nguoidaidien: string;
  tc_nguoidaidien_gt: string;
  tc_nguoidaidien_chucdanh: string;
  tc_nguoidaidien_sdt: string;
  hanhvi_quydinhs: string;
}

export interface IPenaltyIndividualRePort {
  host_unit?: string;
  cn_ten: string;
  cn_gt: string;
  cn_ngaysinh: string;
  cn_quoctich: string;
  cn_nghenghiep: string;
  cn_noio: string;
  cn_sogiayto: string;
  cn_sogiayto_ngaycap: string;
  cn_sogiayto_noicap: string;
  hanhvi_quydinhs: string;
}
