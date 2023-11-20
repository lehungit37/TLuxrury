import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormDatePicker, FormInput, FormSelect } from 'src/components/hook_form';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { toastMessage } from 'src/redux_store/common/toast/toast_action';
import { getRoomManagement, getRoomsShow } from 'src/redux_store/room/room_actions';
import {
  checkCanCreateBooking,
  createBooking,
} from 'src/redux_store/room_booking/room_booking_actions';
import { IRoom } from 'src/types/room';
import { IRoomBooking } from 'src/types/roomBooking';
import { isValidPhoneNumber } from 'src/utils/validation';
import * as yup from 'yup';
import Step1Booking from './step1';
import Step2Booking from './step2';

type Props = {
  asyncGetData: () => void;
};

const ModalAddBooking = ({ asyncGetData }: Props) => {
  const handleChangeStep = (newStep: number) => {
    setActiveStep(newStep);
  };

  const [roomWillBooking, setRoomWillBooking] = useState<{
    roomId: string;
    fromDate: Date;
    toDate: Date;
  }>({ roomId: '', fromDate: new Date(), toDate: new Date() });

  const handleChangeRoomWillBooking = (data: { roomId: string; fromDate: Date; toDate: Date }) => {
    setRoomWillBooking(data);
  };
  const steps = [
    {
      value: 1,
      title: 'Tìm phòng trống',
      component: (
        <Step1Booking
          handleChangeRoomWillBooking={handleChangeRoomWillBooking}
          handleChangeStep={handleChangeStep}
        />
      ),
    },
    {
      value: 2,
      title: 'Đặt phòng',
      component: (
        <Step2Booking
          asyncGetData={asyncGetData}
          roomWillBooking={roomWillBooking}
          handleChangeStep={handleChangeStep}
        />
      ),
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <DialogWrapper
      sx={{ height: '100%' }}
      minWidth={600}
      isFullHeight
      modalId={CModalIds.addBooking}
    >
      <Box p={1} height={'100%'} display="flex" flexDirection="column">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={step.value}>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box marginTop="20px" flex={1}>
          {steps.map((step) => {
            if (step.value - 1 === activeStep) return step.component;
            return <></>;
          })}
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default ModalAddBooking;
