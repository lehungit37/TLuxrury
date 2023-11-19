import { EIndicatorThresholdTypes } from './enum';

export interface IMonitoringGroup {
  id: string;
  name: string;
  symbol: string;
  description: string;
  monitoringTypeId: string;
  monitoringType: string;
  stations?: number;
}

export interface IMonitoringType {
  id: string;
  name: string;
  symbol: string;
  description: string;
  canDelete: boolean;
  monitoringGroups: IMonitoringGroup[];
  stations?: number;
}

export interface IIndicatorParams {
  searchKeyword?: string;
  monitoringType?: string;
  monitoringGroup?: string;
  page?: number;
  limit?: number;
}

export interface IIndicatorThresholdDetail {
  name?: string;
  description?: string;
  shouldCheckThreshold?: boolean;
  safeRangeDescription?: string;
  thresholdRangeDescription?: string;
  lowerLimit: number;
  upperLimit: number;
}

export interface IIndicatorThreshold {
  monitoringGroupId: string;
  type: EIndicatorThresholdTypes;
  detail?: IIndicatorThresholdDetail[];
  deletedAt: Date | null;
}

export interface IIndicator {
  id: string;
  name: string;
  symbol: string;
  description: string;
  monitoringTypeId: string;
  monitoringType: string;
  unit: string;
  thresholds: IIndicatorThreshold[];
  isDefault: boolean;
}

export interface IFormIndicator {
  name: string;
  symbol: string;
  description: string;
  unit: string;
  monitoringTypeId: string;
  thresholds: IIndicatorThreshold[];
}

export interface IDefaultThresholdStation {
  thresholds: IIndicatorThreshold;
}

export interface IIndicatorChart {
  id: string;
  name: string;
  symbol: string;
  description: string;
  monitoringTypeId: string;
  monitoringType: string;
  unit: string;
  thresholds: IIndicatorThreshold;
  isDefault: boolean;
}
