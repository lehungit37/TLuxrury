import moment from 'moment';
import { ICameraSearch } from 'src/types/camera';
import { IPenaltySearch } from 'src/types/penalty';
import { CLimit } from './query';

export const confirmationStatusList = [
  {
    id: 'ALL',
    name: 'Tất cả',
  },
  {
    id: 'true',
    name: 'Đã được kiểm duyệt',
  },
  {
    id: 'false',
    name: 'Chưa được kiểm duyệt',
  },
];

export const initStationSearch = {
  searchKeyword: '',
  monitoringType: '',
  monitoringGroup: '',
  district: '',
  activeStatus: '',
  confirmationStatus: '',
  page: 1,
  limit: CLimit,
};

export const initCameraSearch: ICameraSearch = {
  limit: 16,
  page: 1,
  searchKeyword: '',
  station: '',
};

export const initPenaltySearch: IPenaltySearch = {
  limit: CLimit,
  page: 1,
  searchKeyword: '',
  startDate: moment().subtract(1, 'week').utc(true).format(),
  endDate: moment().utc(true).format(),
};
