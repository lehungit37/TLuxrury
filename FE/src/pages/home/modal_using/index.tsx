import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal_slice';

type Props = {
  roomId: string;
};

function ModalUsingRoom(props: Props) {
  const { roomId } = props;
  const dispatch = useAppDispatch();

  return (
    <DialogWrapper
      sx={{ height: '100%' }}
      minWidth={480}
      modalId={CModalIds.usingRoom}
      isFullHeight
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 1 }}>
        {/* <Typography variant="h6">Thông tin nhận phòng</Typography> */}

        <Box flex={1}>
          <Typography>Tính năng đang phát triển, vui lòng quay lại sau</Typography>
        </Box>
        <Grid container justifyContent="flex-end" columnSpacing={1}>
          <Grid item>
            <Button
              onClick={() => {
                dispatch(closeModal({ modalId: CModalIds.usingRoom }));
              }}
              variant="outlined"
            >
              Huỷ bỏ
            </Button>
          </Grid>
          {/* <Grid item>
            <LoadingButton variant="contained">Nhận phòng</LoadingButton>
          </Grid> */}
        </Grid>
      </Box>
    </DialogWrapper>
  );
}

export default ModalUsingRoom;
