import React from 'react';
import { Close } from '@mui/icons-material';
import { DialogTitle, IconButton } from '@mui/material';
import { useStyles } from './style';

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle className={classes.dialogTitle} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.iconButton}
          sx={{ position: 'absolute' }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default BootstrapDialogTitle;
