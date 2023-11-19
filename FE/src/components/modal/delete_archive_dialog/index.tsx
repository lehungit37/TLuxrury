import React, { ReactNode } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, DialogTitle, Box } from '@mui/material';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import DialogWrapper from '../dialog_wrapper';
import { LoadingButton } from '@mui/lab';
import { useStyles } from './styles';

interface IProps {
  modalId: string;
  title: ReactNode;
  loadingDelete?: boolean;
  loadingArchive: boolean;
  handleDelete?: () => void;
  handleArchive: () => void;
}

function DeleteArchiveDialog(props: IProps) {
  const { modalId, title, loadingDelete, loadingArchive, handleArchive } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (loadingArchive || loadingDelete) {
      return;
    }

    dispatch(closeModal({ modalId }));
  };

  return (
    <DialogWrapper modalId={modalId} prevClose={handleClose}>
      <Box className={classes.dialog}>
        <Box className={classes.icon}>{<Delete fontSize="large" color="error" />}</Box>
        <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
        <Box className={classes.actionButton}>
          <Button color="primary" onClick={handleClose}>
            Quay lại
          </Button>

          {/* <LoadingButton
            variant="outlined"
            color="error"
            onClick={handleDelete}
            loading={loadingDelete}
          >
            Xóa vĩnh viễn
          </LoadingButton>
          <LoadingButton variant="contained" onClick={handleArchive} loading={loadingArchive}>
            Lưu trữ
          </LoadingButton> */}

          <LoadingButton variant="contained" onClick={handleArchive} loading={loadingArchive}>
            Xóa
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
}

export default DeleteArchiveDialog;
