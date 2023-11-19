export interface IFirmware {
  id: string;
  originalName: string;
  monitoringTypeId: string;
  monitoringType: string;
  version: string;
  name: string;
  active: boolean;
  path: string;
  mimetype: string;
  format: string;
  createdAt: string | Date;
}

export interface IFirmwareFilter {
  searchKeyword: string;
  monitoringType: string;
  page: number;
  limit: number;
}
