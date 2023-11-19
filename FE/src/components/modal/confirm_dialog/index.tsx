import React, { ReactNode } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, DialogTitle, Box } from '@mui/material';
import { useStyles } from './styles';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { useIsRequestPending } from 'src/hooks';
import DialogWrapper from '../dialog_wrapper';
import { LoadingButton } from '@mui/lab';

interface IConfirmationDialog {
  modalId: string;
  describe: ReactNode;
  cancelLabel?: string;
  okLabel?: string;
  icon?: ReactNode;
  sliceName: string;
  functionName: string;
  children?: ReactNode;
  disabled?: boolean;
  callback: () => any;
}

function ConfirmationDialog(props: IConfirmationDialog) {
  const {
    modalId,
    describe,
    icon,
    sliceName,
    functionName,
    cancelLabel = 'Quay lại',
    okLabel = 'Tiếp tục',
    children,
    disabled,
    callback,
  } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const isLoading = useIsRequestPending(sliceName, functionName);

  const handleClose = () => {
    dispatch(closeModal({ modalId }));
  };

  return (
    <DialogWrapper modalId={modalId}>
      <Box className={classes.dialog}>
        <Box className={classes.icon}>
          {icon ? icon : <Delete fontSize="large" color="error" />}
        </Box>
        <DialogTitle className={classes.dialogTitle}>{describe}</DialogTitle>
        {children}
        <Box className={classes.actionButton}>
          <Button color="primary" onClick={handleClose}>
            {cancelLabel}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={callback}
            loading={isLoading}
            disabled={disabled}
          >
            {okLabel}
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  );
}

export default ConfirmationDialog;
