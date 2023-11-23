import { Button, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useIsRequestPending } from 'src/hooks';
import { exportExcel, getRoomsShow, getStatistical } from 'src/redux_store/room/room_actions';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loading from 'src/components/loading';
import Chart from './chart';
import { FormDateTimePicker } from 'src/components/hook_form/form_datetimepicker';
import { useForm } from 'react-hook-form';
import theme from 'src/theme';
import { FileDownloadOutlined, ImportExportOutlined } from '@mui/icons-material';
import { IRoom } from 'src/types/room';
import { FormSelect } from 'src/components/hook_form';
import { LoadingButton } from '@mui/lab';

function RevenueManagement() {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<{ id: string; totalAmount: number }[]>([]);
  const [roomList, setRoomList] = useState<{ id: string; name: string }[]>([
    { id: 'all', name: 'Tất cả' },
  ]);
  const [payload, setPayload] = useState<any>({
    startDate: moment().subtract(7, 'days'),
    endDate: moment(),
    roomId: 'all',
    typeTime: 'day',
  });
  const { control, watch } = useForm({ defaultValues: payload });

  const isLoading = useIsRequestPending('room', 'getStatistical');
  const isLoadingExport = useIsRequestPending('room', 'exportExcel');

  useEffect(() => {
    dispatch(getStatistical({ ...payload, roomId: payload.roomId === 'all' ? '' : payload.roomId }))
      .unwrap()
      .then((result) => {
        setData(result);
      });
  }, [payload]);

  useEffect(() => {
    dispatch(getRoomsShow({ status: '', roomTypeId: '' }))
      .unwrap()
      .then((rooms) => {
        setRoomList((prev) => prev.concat(rooms));
      });
  }, []);

  const handleChange = (name: string, value: any) => {
    const newPayload = { ...payload, [name]: value };
    setPayload(newPayload);
  };

  const handleExportExcel = () => {
    dispatch(exportExcel({ ...payload, roomId: payload.roomId === 'all' ? '' : payload.roomId }));
  };

  return (
    <Grid container flexDirection="column" width="100%" height="100%">
      <Grid item>
        <Grid
          container
          sx={{ background: theme.palette.common.white, p: 1, mb: 1 }}
          alignItems="center"
        >
          <Grid item flex={1}>
            <Grid container columnSpacing={1}>
              <Grid item md={2}>
                <FormDateTimePicker
                  control={control}
                  label="Từ ngày"
                  name="startDate"
                  maxDate={watch('endDate')}
                  handleChange={handleChange}
                  handleChangeClick={handleChange}
                />
              </Grid>
              <Grid item md={2}>
                <FormDateTimePicker
                  control={control}
                  label="Đến ngày"
                  name="endDate"
                  minDate={watch('startDate')}
                  handleChange={handleChange}
                  handleChangeClick={handleChange}
                />
              </Grid>
              <Grid item md={2}>
                <FormSelect
                  name="roomId"
                  options={roomList}
                  keyOption="id"
                  label="Phòng"
                  labelOption="name"
                  control={control}
                  handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <LoadingButton
              onClick={handleExportExcel}
              variant="contained"
              startIcon={<FileDownloadOutlined />}
              loading={isLoadingExport}
            >
              Xuất Excel
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid item flex={1}>
        <Box
          height="100%"
          width="100%"
          p={2}
          sx={{ background: theme.palette.common.white, display: 'flex', justifyContent: 'center' }}
        >
          {isLoading ? <Loading /> : <Chart data={data} />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default RevenueManagement;
