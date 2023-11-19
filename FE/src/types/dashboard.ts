export interface IStationData {
  station: {
    general: {
      totalStations: number;
      detail: {
        monitoringType: string;
        total: number;
      }[];
    };
    detail: {
      monitoringType: string;
      total: number;

      totalConnectedStations: number;

      detailOfConnectedStations: {
        workNormal: number;
        overThreshold: number;
        deviceError: number;
      };
      totalDisconnectedStations: number;
    }[];
  };
}

export interface ICamaraData {
  total: number;
  detail: {
    workNormal: number;
    error: number;
    disconnect: number;
  };
}

export interface ISamplingData {
  total: number;
  detail: {
    totalSamplingInLastWeek: number;
    totalSamplingInLastMonth: number;
  };
}

export interface IPenaltyData {
  totalPenaltiesInWeek: number;
  totalHandledPenaltiesInWeek: number;
  totalPenaltiesInDay: number;
  totalHandledPenaltiesDay: number;
  totalPenaltiesInMonth: number;
  totalHandledPenaltiesInMonth: number;
}

export interface IUsersData {
  totalUsers: number;
  totalRoles: number;
}

export interface IMonitoringData {
  totalDataInThisMonth: number;
  totalApprovedDataInThisMonth: number;
  totalDataInLastMonth: number;
  totalApprovedDataInLastMonth: number;
}
