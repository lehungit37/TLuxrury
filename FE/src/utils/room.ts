import theme from 'src/theme';
import { ERoomStatus } from 'src/types/room';

export const renderRoomStatus = (status: ERoomStatus) => {
  if (status === ERoomStatus.WORKING) return 'Đang sử dụng';
  if (status === ERoomStatus.UPDATING) return 'Đang bảo trì';
  return 'Đang rảnh';
};

export const renderColorRoom = (roomStatus: ERoomStatus) => {
  if (roomStatus === ERoomStatus.WORKING) return theme.palette.success.main;
  if (roomStatus === ERoomStatus.UPDATING) return theme.palette.warning.main;
  return theme.palette.primary.main;
};

export const renderColorRoomChip = (roomStatus: ERoomStatus) => {
  if (roomStatus === ERoomStatus.WORKING) return 'success';
  if (roomStatus === ERoomStatus.UPDATING) return 'warning';
  return 'primary';
};
