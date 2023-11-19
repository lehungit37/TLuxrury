import { ReactNode } from 'react';

export type TMuiSize = 'small' | 'medium' | 'large';

export type TMuiColor =
  | 'warning'
  | 'default'
  | 'error'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | undefined;

export interface IModal {
  modalId: string;
  modalComponent?: ReactNode;
}

export interface IModalState {
  [modalId: string]: {
    open: boolean;
    modalComponent: ReactNode;
  };
}

export interface ITabItem {
  key: string;
  label: string;
  component: ReactNode;
  typeTab?: string;
}

export interface IPagination<T> {
  totalData: number;
  data: T[];
}
export interface IErrorsDetail {
  [x: string]: { id: string; message: string }[];
}

export interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

export interface IFilterOption {
  id: string;
  name: string;
}

export interface IFilter {
  monitoringType: IFilterOption[];
  monitoringGroup: IFilterOption[];
  district: IFilterOption[];
  status: IFilterOption[];
}

export interface IFilterState {
  monitoringType: string;
  monitoringGroup: string;
  status: string;
  district: string;
  station: string;
}

export enum ETimeType {
  DAY = 'DAY',
  MONTH = 'MONTH',
}
