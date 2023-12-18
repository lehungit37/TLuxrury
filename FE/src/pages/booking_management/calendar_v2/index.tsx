import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentTooltip,
  WeekView,
  AllDayPanel,
  DateNavigator,
  Toolbar,
  Resources,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { useAppDispatch } from 'src/hooks';
import moment from 'moment';
import { getRoomBookingManagemnt } from 'src/redux_store/room_booking/room_booking_actions';
import { openModal } from 'src/redux_store/common/modal_slice';
import { CModalIds } from 'src/constants';
import ModalAddBooking from '../modal_add_booking';
import { getRoomsShow } from 'src/redux_store/room/room_actions';
import RoomBookingInfo from './info';
import { AddOutlined } from '@mui/icons-material';
import { IRoomBooking } from 'src/types/roomBooking';
import theme from 'src/theme';

const CalendarV2 = () => {
  const [resources, setResources] = useState<any[]>([
    {
      fieldName: 'roomId',
      title: 'Phòng',
      instances: [],
    },
  ]);
  const [data, setData] = useState<any[]>([]);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const dispatch = useAppDispatch();

  const getData = (newTime: Date) => {
    const time = getTime(newTime);
    dispatch(getRoomBookingManagemnt(time))
      .unwrap()
      .then((result) => {
        const newData = result.map((item) => {
          return {
            title: item.customerName,
            startDate: new Date(item.fromDate),
            endDate: new Date(item.toDate),
            id: item.id,
            roomId: item.roomId,
            room: item.room,
            customerPhone: item.customerPhone,
          };
        });

        setData(newData);
      });
  };

  useEffect(() => {
    dispatch(getRoomsShow({ status: '', roomTypeId: '' }))
      .unwrap()
      .then((rooms) => {
        const datas = rooms.map((room) => {
          return { id: room.id, text: room.id };
        });
        setResources([
          {
            fieldName: 'roomId',
            title: 'Phòng',
            instances: datas,
          },
        ]);
      });
  }, []);

  useEffect(() => {
    getData(new Date());
  }, []);

  const onDeleteSuccess = (id: string) => {
    let currentData = [...data];
    currentData = currentData.filter((appointment) => appointment.id !== id);

    setData(currentData);
  };

  const onAddSuccess = (roomBooking: IRoomBooking) => {
    let currentData = [...data];
    const newData = {
      title: roomBooking.customerName,
      startDate: new Date(roomBooking.fromDate),
      endDate: new Date(roomBooking.toDate),
      id: roomBooking.id,
      roomId: roomBooking.roomId,
      room: roomBooking.room,
      customerPhone: roomBooking.customerPhone,
    };

    currentData = [...currentData, newData];
    setData(currentData);
  };

  const getTime = (date: Date) => {
    const dayInWeek = date.getDay();

    // if(dayInWeek === 7) {}
    if (dayInWeek === 0) {
      const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
      const endDate = new Date(
        new Date(moment(date).add(6, 'days').toString()).setHours(23, 59, 59),
      );

      return { startDate, endDate };
    } else {
      const startDate = new Date(
        new Date(
          moment(date)
            .subtract(dayInWeek, dayInWeek ? 'day' : 'days')
            .toString(),
        ).setHours(0, 0, 0, 0),
      );
      const endDate = new Date(
        new Date(
          moment(date)
            .add(6 - dayInWeek, 'days')
            .toString(),
        ).setHours(23, 59, 59),
      );

      return { startDate, endDate };
    }
  };

  const Appointment = ({ children, style, data, ...restProps }: any) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          // borderRadius: '8px',
          // background: '#018b88',
        }}
        onClick={(e) => {
          dispatch(
            openModal({
              modalId: CModalIds.update_booking,
              modalComponent: <RoomBookingInfo onDeleteSuccess={onDeleteSuccess} data={data} />,
            }),
          );
        }}
      >
        <Box px={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: theme.palette.common.white }}
          >
            {data.title} - {data.room.name}
          </Typography>
        </Box>
      </Appointments.Appointment>
    );
  };

  const handleBooking = () => {
    dispatch(
      openModal({
        modalId: CModalIds.addBooking,
        modalComponent: <ModalAddBooking onAddSuccess={onAddSuccess} />,
      }),
    );
  };

  return (
    <Paper>
      <Grid container p={1} justifyContent="flex-end">
        <Grid item>
          <Button onClick={handleBooking} startIcon={<AddOutlined />} variant="contained">
            Đặt phòng
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Scheduler data={data} height={(window.innerHeight * 90) / 100}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(currentDate: any) => {
            setCurrentDate(currentDate);
            getData(new Date(currentDate));
          }}
        />

        {/* <DayView /> */}

        <WeekView startDayHour={6} endDayHour={24} />
        <AllDayPanel />

        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showOpenButton showDeleteButton />

        <Resources data={resources} />
        <Toolbar />
        <DateNavigator />
      </Scheduler>
    </Paper>
  );
};

export default CalendarV2;
