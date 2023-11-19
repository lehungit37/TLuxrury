import { Moment } from 'moment';

export interface IPayloadChartData {
  limit: number;
  startAt: Moment;
  endAt: Moment;
  stationId: string;
}

export interface IGetChartData extends IPayloadChartData {
  userId: string;
}
interface IIndicatorData {
  [x: string]: {
    color: string;
    isOverThreshold: boolean;
    sentAt: string;
    value: number;
  }[];
}

export interface IIndicatorChartData {
  id: string;
  lowerLimit: number;
  name: string;
  symbol: string;
  unit: string;
  upperLimit: number;
  wqiIndicator: null | string;
}

export interface IChartData {
  id: string;
  latestSentAt: string;
  monitoringGroupId: string;
  name: string;
  totalData: number;
  indicatorData: IIndicatorData;
  indicators: IIndicatorChartData[];
}
