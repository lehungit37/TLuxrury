import { IPayloadGetHistorySample, IPayloadGetSample } from 'src/types/sample';
import * as yup from 'yup';

export const initPayloadSample: IPayloadGetSample = {
  page: 1,
  limit: 15,
  searchKeyword: '',
};

export const initPayloadHistorySample: IPayloadGetHistorySample = {
  startTime: '',
  endTime: '',
  page: 1,
  limit: 15,
};

export const schema = yup.object({
  stationId: yup.string().required('Vui lòng nhập tên trạm'),
  // host: yup.string().required('Host là trường bắt buộc. Ví dụ 10.22.12.55'),
  host: yup
    .string()
    .required('Host là trường bắt buộc. Ví dụ 10.22.12.55')
    .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
      message: 'Không đúng địa chỉ host. Ví dụ 10.22.12.55',
      excludeEmptyString: true,
    })
    .test('ipAddress', 'Giá trị địa chỉ host phải nhỏ hơn hoặc bằng 255', (value) => {
      if (value === undefined || value.trim() === '') return true;
      return value.split('.').find((i) => parseInt(i) > 255) === undefined;
    }),
  port: yup
    .number()
    .typeError('Vui lòng nhập port')
    .required('Vui lòng nhập port')
    .test('Is positive?', 'Port phải lớn hơn 0', (value: any) => value > 0)
    .min(0, 'Port phải lớn hơn 0')
    .nullable(),
  username: yup.string().required('Vui lòng nhập tên người dùng'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});
