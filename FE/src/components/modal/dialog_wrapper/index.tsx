import React, { ReactNode } from 'react';
import { Dialog, Box, SxProps, Theme, Breakpoint } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { useStyles } from './styles';
import { closeModal } from 'src/redux_store/common/modal_slice';

interface IDialogWrapperProps {
  modalId: string;
  minWidth?: number;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  children: ReactNode;
  sx?: SxProps<Theme>;
  classNames?: string;
  isFullHeight?: boolean;
  isNotAutoClose?: boolean;
  maxWidthDialog?: false | Breakpoint | undefined;
  isFullWidth?: boolean;
  prevClose?: any;
  scroll?: 'body' | 'paper';
}

function DialogWrapper(props: IDialogWrapperProps) {
  const {
    children,
    minWidth = 380,
    paddingTop,
    modalId,
    maxWidth,
    paddingBottom,
    sx,
    classNames,
    isFullHeight = false,
    isNotAutoClose = false,
    maxWidthDialog = 'lg',
    isFullWidth = false,
    prevClose,
    scroll = 'body',
  } = props;
  const classes = useStyles();
  const modalState = useAppSelector((state) => state.modalSlice);
  const modal = modalState[modalId];

  const dispatch = useAppDispatch();

  return (
    <Dialog
      disableRestoreFocus
      open={modal.open}
      scroll={scroll}
      onClose={() => {
        if (prevClose) return prevClose();
        if (!isNotAutoClose) {
          dispatch(
            closeModal({
              modalId,
            }),
          );
        }
      }}
      classes={{ paper: isFullHeight ? classes.fullHeight : classes.paper }}
      maxWidth={maxWidthDialog}
      fullWidth={isFullWidth}
    >
      <Box
        sx={sx}
        className={classNames}
        minWidth={minWidth}
        maxWidth={maxWidth}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        position="relative"
      >
        {children}
      </Box>
    </Dialog>
  );
}

export default DialogWrapper;
