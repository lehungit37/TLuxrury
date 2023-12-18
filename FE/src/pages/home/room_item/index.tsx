import {
  DeleteOutlined,
  HourglassEmptyOutlined,
  Login,
  LoginOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Badge, Box, Button, Divider, Grid, IconButton, Popover, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ConfirmationDialog from 'src/components/modal/confirm_dialog';
import IconButtonTooltip from 'src/components/tooltip/icon_button_tooltip';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import RoomBookingInfo from 'src/pages/booking_management/calendar_v2/info';
import { closeModal, openModal } from 'src/redux_store/common/modal_slice';
import { getRoomBookingByRoomId, updateRoom } from 'src/redux_store/room/room_actions';
import { updateTotalBooking } from 'src/redux_store/room/room_slice';
import { deleteRoomBooking } from 'src/redux_store/room_booking/room_booking_actions';
import theme from 'src/theme';
import { ERoomStatus, IRoom } from 'src/types/room';
import { IRoomBooking } from 'src/types/roomBooking';
import { formatNumberToVND } from 'src/utils/function';
import { renderColorRoom, renderColorRoomChip, renderRoomStatus } from 'src/utils/room';
import { toastMessage } from 'src/utils/toast';
import ModalPayment from '../modal_payment';
import ModalUsingRoom from '../modal_using';

type Props = {
  room: IRoom;
};

const RoomItem = (props: Props) => {
  const { room } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [roomBookings, setRoomBookings] = useState<IRoomBooking[]>([]);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGetRoomBooking = () => {
    if (!room.totalBooking) return;
    dispatch(getRoomBookingByRoomId(room.id))
      .unwrap()
      .then((data) => {
        console.log(data);

        setRoomBookings(data);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleUsingRoom = (
    defaultForm: { customerPhone: string; customerName: string },
    isDisabled: boolean,
    callback?: () => void,
  ) => {
    dispatch(
      openModal({
        modalId: CModalIds.usingRoom,
        modalComponent: (
          <ModalUsingRoom
            callback={callback}
            room={room}
            defaultForm={defaultForm}
            isDisabled={isDisabled}
          />
        ),
      }),
    );
  };

  const handlePayment = () => {
    dispatch(
      openModal({
        modalId: CModalIds.getPaymentInfo,
        modalComponent: <ModalPayment room={room} />,
      }),
    );
  };

  const handleViewBooking = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(event);
    handleGetRoomBooking();
  };

  const handleDeleteBooking = (roomBookingId: string, isShowMessage?: boolean) => {
    dispatch(deleteRoomBooking(roomBookingId))
      .unwrap()
      .then(() => {
        if (isShowMessage) {
          toastMessage.success('Xoá đặt phòng thành công');
        }
        const currentData = [...roomBookings].filter((item) => item.id !== roomBookingId);
        setRoomBookings(currentData);
        dispatch(updateTotalBooking({ roomId: room.id, newTotalBooking: room.totalBooking - 1 }));
        dispatch(
          closeModal({
            modalId: 'deleteBooking',
          }),
        );
      })
      .catch((error) => {
        toastMessage.error(error.message || 'Xoá đặt phòng thành công');
      });
  };

  const handleMaintenance = () => {
    const status = room.status === ERoomStatus.UPDATING ? ERoomStatus.FREE : ERoomStatus.UPDATING;
    setIsLoadingUpdate(true);
    dispatch(updateRoom({ roomId: room.id, newRoom: { ...room, status } }))
      .unwrap()
      .then(() => {
        setIsLoadingUpdate(false);
        toastMessage.success('Cập nhật trạng thái thành công');
      })
      .catch(() => {
        setIsLoadingUpdate(false);
        toastMessage.error('Cập nhật trạng thái thất bại');
      });
  };

  const handleOpenModalDeleteBooking = (roomBookingId: string) => {
    dispatch(
      openModal({
        modalId: 'deleteBooking',
        modalComponent: (
          <ConfirmationDialog
            modalId="deleteBooking"
            describe="Bạn có muốn xoá lượt đặt phòng này không ?"
            sliceName="rooms"
            functionName="deleteBooking"
            callback={() => handleDeleteBooking(roomBookingId, true)}
          />
        ),
      }),
    );
  };

  const renderListRoomBooking = () => {
    if (!roomBookings.length)
      return (
        <Box p={2}>
          <Typography>Không có lượt đặt phòng nào</Typography>
        </Box>
      );

    return (
      <Box width={400} minHeight={200} height={200} maxHeight={500}>
        <Scrollbars>
          <Grid p={2} container flexDirection="column">
            {roomBookings.map((roomItem) => {
              return (
                <>
                  <Grid item key={roomItem.id}>
                    <Grid container>
                      <Grid item flex={1}>
                        <Box sx={{ display: 'flex' }}>
                          <Box
                            sx={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              backgroundColor: theme.palette.primary.main,
                              mr: 2,
                              mt: 1,
                            }}
                          ></Box>

                          <Box>
                            <Typography fontWeight="bold" variant="h5">
                              {roomItem.customerName}
                            </Typography>
                            <Typography fontWeight="bold">{roomItem.customerPhone}</Typography>
                          </Box>
                        </Box>

                        <Box display={'flex'} sx={{ alignItems: 'center' }} mt={1}>
                          <Box
                            sx={{
                              width: '30px',
                              height: '30px',
                              mr: 2,
                            }}
                          >
                            <LoginOutlined />
                          </Box>
                          <Box>
                            <Typography fontWeight="bold">
                              Nhận phòng: {moment(roomItem.fromDate).format('YYYY-MM-DD HH:mm')}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display={'flex'} sx={{ alignItems: 'center' }} mt={1}>
                          <Box
                            sx={{
                              width: '30px',
                              height: '30px',
                              mr: 2,
                            }}
                          >
                            <LogoutOutlined />
                          </Box>
                          <Box>
                            <Typography fontWeight="bold">
                              Trả phòng: {moment(roomItem.toDate).format('YYYY-MM-DD HH:mm')}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <IconButtonTooltip
                              color="success"
                              title="Nhận phòng"
                              disabled={room.status !== ERoomStatus.FREE}
                              onClick={() =>
                                handleUsingRoom(
                                  {
                                    customerName: roomItem.customerName,
                                    customerPhone: roomItem.customerPhone,
                                  },
                                  true,
                                  () => handleDeleteBooking(roomItem.id, false),
                                )
                              }
                              icon={<LoginOutlined />}
                            />
                          </Grid>
                          <Grid item>
                            <IconButtonTooltip
                              color="error"
                              onClick={() => handleOpenModalDeleteBooking(roomItem.id)}
                              title="Xoá đặt phòng"
                              icon={<DeleteOutlined />}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Divider />
                </>
              );
            })}
          </Grid>
        </Scrollbars>
      </Box>
    );
  };

  return (
    <Box sx={{ border: `2px solid ${renderColorRoom(room.status)}`, borderRadius: '8px' }}>
      <Grid container flexDirection="column">
        <Grid item padding={2} sx={{ background: renderColorRoom(room.status) }}>
          <Typography
            fontWeight={600}
            variant="h6"
            textAlign="center"
            color={theme.palette.common.white}
          >
            {room.name}
          </Typography>
          <Typography fontWeight={600} textAlign="center" color={theme.palette.common.white}>
            {formatNumberToVND(room.price)}
          </Typography>
          <Typography textAlign="center" color={theme.palette.common.white}>
            {room.roomTypes.name}
          </Typography>
        </Grid>
        <Grid item p={2}>
          <Typography textAlign="center" color={renderColorRoom(room.status)}>
            {renderRoomStatus(room.status)}
          </Typography>
          <Grid container columnSpacing={2} alignItems="center">
            <Grid item>
              <IconButton onClick={handleViewBooking}>
                <Badge badgeContent={room.totalBooking || 0} color="primary">
                  <HourglassEmptyOutlined color="action" />
                </Badge>
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box>{renderListRoomBooking()}</Box>
              </Popover>
            </Grid>
            <Grid item>
              <Typography>Có {room.totalBooking || 0} lượt đặt phòng</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container pl={1} columnSpacing={1} rowSpacing={1} sx={{ width: '100%' }}>
            {room.status === ERoomStatus.WORKING ? (
              <Grid item md={6}>
                <Button
                  color={renderColorRoomChip(ERoomStatus.WORKING)}
                  fullWidth
                  variant="outlined"
                  onClick={handlePayment}
                >
                  Tính tiền
                </Button>
              </Grid>
            ) : (
              <Grid item md={6}>
                <Button
                  color={renderColorRoomChip(ERoomStatus.WORKING)}
                  variant="contained"
                  fullWidth
                  onClick={() => handleUsingRoom({ customerName: '', customerPhone: '' }, false)}
                  disabled={room.status === ERoomStatus.UPDATING}
                >
                  Sử dụng
                </Button>
              </Grid>
            )}
            <Grid item md={6}>
              <LoadingButton
                color={renderColorRoomChip(ERoomStatus.UPDATING)}
                fullWidth
                variant={room.status === ERoomStatus.UPDATING ? 'outlined' : 'contained'}
                onClick={handleMaintenance}
                loading={isLoadingUpdate}
                disabled={room.status === ERoomStatus.WORKING}
              >
                {room.status === ERoomStatus.UPDATING ? 'Bảo trì xong' : 'Bảo trì'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomItem;
