import React, { ReactNode } from 'react';
import { Tooltip, Typography, TypographyProps } from '@mui/material';

interface ITooltipProps {
  title: NonNullable<React.ReactNode>;
  disabled?: boolean;
  children: ReactNode;
  arrow?: boolean;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

type TTypographyTooltipProps = TypographyProps & ITooltipProps;

const TypographyTooltip = (props: TTypographyTooltipProps) => {
  const { title, disabled, placement, arrow = true, children, ...typoProps } = props;
  return (
    <Tooltip title={disabled ? '' : title} placement={placement} arrow={arrow}>
      <Typography {...typoProps}>{children}</Typography>
    </Tooltip>
  );
};

export default TypographyTooltip;
