export interface IStationsSample {
  id?: string;
  stationId: string;
  stationName?: string;
  host: string;
  port: number;
  status: boolean;
  username: string;
  password: string;
  lastSample?: ISampleHistory;
}

export interface ISampleHistory {
  id?: string;
  stationId: string;
  bottle: number;
  finishedSampleAt: Date;
  status: ISampleStatus;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayloadGetHistorySample {
  startTime: Date | string;
  endTime: Date | string;
  page: number;
  limit: number;
}

export type ISampleStatus = 'error' | 'pending' | 'success';

export interface IPayloadFormSample {
  id?: string;
  stationId: string;
  host: string;
  port: number;
  status: boolean;
  username: string;
  password: string;
}

export interface IUpdateSample {
  stationId?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
}

export interface IPayloadGetSample {
  limit: number;
  page: number;
  searchKeyword: string;
}

export interface IDataCreateSample {
  id: string;
  stationId: string;
  host: string;
  port: number;
  username: string;
  password: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
