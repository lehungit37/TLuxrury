import { EPenaltyError, EPenaltyErrorReason, EPenaltyStatus } from 'src/types/penalty';

export const PenaltyStatus = [
  {
    value: EPenaltyStatus.PENDING,
    label: 'Đang xử lý',
  },
  {
    value: EPenaltyStatus.FINISHED,
    label: 'Đã kết thúc',
  },
];

export const PenaltyErrors: {
  value: EPenaltyError;
  key: 'disconnect' | 'wrongStructure' | 'overThreshold';
  label: string;
  name: string;
  color: 'default' | 'error' | 'info' | 'primary' | 'warning' | 'secondary' | 'success' | undefined;
}[] = [
  {
    value: EPenaltyError.DISCONNECT,
    label: 'Không nhận được dữ liệu',
    name: 'Mất kết nối',
    color: 'primary',
    key: 'disconnect',
  },
  {
    value: EPenaltyError.WRONG_STRUCTURE,
    label: 'Dữ liệu vượt bất thường, hoặc có dấu hiệu khác có nguồn tác động',
    name: 'Sai cấu trúc',
    color: 'warning',
    key: 'wrongStructure',
  },
  {
    key: 'overThreshold',
    value: EPenaltyError.OVER_THRESHOLD,
    label: 'Thông số quan trắc vượt QC',
    name: 'Vượt ngưỡng',
    color: 'error',
  },
];

export const PenaltyErrorOptions = [
  {
    value: EPenaltyErrorReason.TRANSMISSION_ERROR,
    label: 'Lỗi đường truyền',
  },
  {
    value: EPenaltyErrorReason.SYSTEM_ERROR,
    label: 'Lỗi phần mềm',
  },
  {
    value: EPenaltyErrorReason.SYSTEM_TECHNICAL_ERROR,
    label: 'Lỗi kỹ thuật HT QTTĐ',
  },
  {
    value: EPenaltyErrorReason.OVER_THRESHOLD_STATION,
    label: 'Trạm vượt ngưỡng',
    ignore: true,
  },
];

export const ErrorCorrectionPlan = [
  {
    value: 'OVERCOME',
    label: 'Khắc phục (<= 2 ngày)',
  },
  {
    value: 'CHANGE_DEVICE',
    label: 'Thay thiết bị (<= 30 ngày)',
  },
];
