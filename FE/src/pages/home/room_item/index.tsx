import { HourglassEmptyOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Badge, Box, Button, Grid, IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal_slice';
import { updateRoom } from 'src/redux_store/room/room_actions';
import theme from 'src/theme';
import { ERoomStatus, IRoom } from 'src/types/room';
import { formatNumberToVND } from 'src/utils/function';
import { renderColorRoom, renderColorRoomChip, renderRoomStatus } from 'src/utils/room';
import { toastMessage } from 'src/utils/toast';
import ModalUsingRoom from '../modal_using';

type Props = {
  room: IRoom;
};

const RoomItem = (props: Props) => {
  const { room } = props;

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleUsingRoom = () => {
    // dispatch(
    //   openModal({
    //     modalId: CModalIds.usingRoom,
    //     modalComponent: <ModalUsingRoom roomId={room.id} />,
    //   }),
    // );

    dispatch(updateRoom({ roomId: room.id, newRoom: { ...room, status: ERoomStatus.WORKING } }))
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

  const handlePayment = () => {
    // dispatch(
    //   openModal({
    //     modalId: CModalIds.usingRoom,
    //     modalComponent: <ModalUsingRoom roomId={room.id} />,
    //   }),
    // );

    dispatch(updateRoom({ roomId: room.id, newRoom: { ...room, status: ERoomStatus.FREE } }))
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

  const handleViewBooking = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(event);
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
                <Badge badgeContent={3} color="primary">
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
                <Typography sx={{ p: 2 }}>
                  Tính năng đang được phát triển, vui lòng quay lại sau
                </Typography>
              </Popover>
            </Grid>
            <Grid item>
              <Typography>Có 3 lượt đặt phòng</Typography>
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
                  onClick={handleUsingRoom}
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
