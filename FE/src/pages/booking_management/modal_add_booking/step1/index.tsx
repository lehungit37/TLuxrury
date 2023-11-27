import { Home } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import { FormDateTimePicker } from 'src/components/hook_form/form_datetimepicker';
import { useAppDispatch } from 'src/redux_store';
import { getRoomCanBooking } from 'src/redux_store/room/room_actions';
import theme from 'src/theme';
import { IRoom } from 'src/types/room';
import { formatNumberToVND } from 'src/utils/function';
import emptyDataImage from 'src/assets/images/empty_data.jpeg';
import { toastMessage } from 'src/utils/toast';
import { useIsRequestPending } from 'src/hooks';
import Loading from 'src/components/loading';
import moment from 'moment';

type Props = {
  handleChangeStep: (newStep: number) => void;
  handleChangeRoomWillBooking: (data: { roomId: string; fromDate: Date; toDate: Date }) => void;
};

const Step1Booking = (props: Props) => {
  const { handleChangeStep, handleChangeRoomWillBooking } = props;
  const dispatch = useAppDispatch();
  const isLoading = useIsRequestPending('rooms', 'getRoomCanBooking');

  const [rooms, setRooms] = useState<IRoom[]>([]);

  const { control, getValues } = useForm({
    defaultValues: {
      fromDate: new Date(),
      toDate: new Date(moment().add(1, 'day').toString()),
    },
  });

  const asyncGetData = () => {
    const { fromDate, toDate } = getValues();
    dispatch(getRoomCanBooking({ fromDate: new Date(fromDate), toDate: new Date(toDate) }))
      .unwrap()
      .then((data) => {
        setRooms(data);
      });
  };

  useEffect(() => {
    asyncGetData();
  }, []);

  const handleSearch = () => {
    const { fromDate, toDate } = getValues();

    if (new Date(fromDate).getTime() > new Date(toDate).getTime()) {
      toastMessage.error('Thời gian nhận phòng phải bé hơn thời gian trả phòng');
      return;
    }
    asyncGetData();
  };

  const handleBooking = (room: IRoom) => {
    const { fromDate, toDate } = getValues();
    handleChangeRoomWillBooking({
      roomId: room.id,
      fromDate,
      toDate,
    });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box>
        <Grid container alignItems="center" columnSpacing={1}>
          <Grid item md={4}>
            <FormDateTimePicker
              minDate={new Date()}
              control={control}
              name="fromDate"
              label="Thời gian nhận phòng"
            />
          </Grid>
          <Grid item md={4}>
            <FormDateTimePicker
              minDate={getValues().fromDate}
              control={control}
              name="toDate"
              label="Thời gian trả phòng"
            />
          </Grid>
          <Grid item md={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box flex={1} display="flex" flexDirection="column">
        <Typography variant="subtitle1" fontWeight={600}>
          Danh sách phòng
        </Typography>
        <Box flex={1}>
          <Scrollbars>
            <Grid container flexDirection="column" p={1}>
              {isLoading ? (
                <Loading />
              ) : rooms.length ? (
                rooms.map((room) => {
                  return (
                    <Grid
                      key={room.id}
                      item
                      mb={1}
                      p={1}
                      border={`1px solid ${theme.palette.grey[300]}`}
                      borderRadius={2}
                    >
                      <Grid container alignItems="center">
                        <Grid item flex={1}>
                          <Box display="flex" alignItems="center">
                            <Avatar>
                              <Home />
                            </Avatar>
                            <Box ml={1}>
                              <Typography variant="subtitle1">{room.name}</Typography>
                              <Typography variant="body2">
                                {formatNumberToVND(room.price)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => {
                              handleBooking(room);
                              handleChangeStep(2 - 1);
                            }}
                            variant="contained"
                          >
                            Đặt phòng
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img style={{ width: '100%' }} src={emptyDataImage} />
                </Box>
              )}
            </Grid>
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
};

export default Step1Booking;
