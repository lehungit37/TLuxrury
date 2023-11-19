import { Moment } from 'moment';
export interface IDataSelectedIndicator {
    id: string;
    lowerLimit: number;
    name: string;
    symbol: string;
    unit: string;
    upperLimit: number;
    wqiIndicator?: number;
}

export interface IFilterOption {
    id: string;
    name: string;
}

export interface IDataColumn {
    selectedIndicator: IDataSelectedIndicator[];
}

export interface IPayloadGetData {
    endTime: string | Moment;
    limit: number;
    page: number;
    dataType: 'HOUR' | 'MINUTE';
    startTime: string | Moment;
    stationId: string;
}

export interface IDataItem {
    data: {
        [x: string]: number
    };
    id: string;
    name: string;
    sentAt: string | Moment;
    approved: boolean;
    bucketId: string;
}

export interface IGetData {
    data: IDataItem[];
    totalData: number;
}

export interface IPayloadGetStation {
    monitoringType?: string;
    monitoringGroup?: string;
    district?: string;
}
export interface IStationFilter {
    monitoringType: IFilterOption[];
    monitoringGroup: IFilterOption[];
    district: IFilterOption[];
    indicator: {
        id: string;
        name: string;
        unit: string;
    }
    reportType: IFilterOption[];
    selectedIndicator: IDataSelectedIndicator[];
    station: IFilterOption[];
}

export interface IStationByManagerId {
    selectedIndicator: IDataSelectedIndicator[];
    station: IFilterOption[];
}

export interface IPayloadApproveData {
    bucketId: string;
    dataId: string;
    approved: boolean;
}
export interface IPayloadEditData {
    bucketId: string;
    dataId: string;
    details: {
        indicator: string;
        value: number
    }[]
}



