import React, { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';

import { TMuiColor, TMuiSize } from 'src/types/common';

interface IIconButtonTooltipProps {
  title: string;
  icon: ReactNode;
  color?: TMuiColor;
  size?: TMuiSize;
  onClick?: (arg?: any) => void;
  disabled?: boolean;
  style?: object;
  // isEmptyTitle?: boolean;
  placement?:
    | 'right'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | 'top';
}

export default function IconButtonTooltip(props: IIconButtonTooltipProps) {
  const {
    title,
    icon,
    color = 'inherit',
    size,
    disabled,
    style = {},
    placement = 'bottom',
    // isEmptyTitle = false,
    onClick,
  } = props;
  return (
    <Tooltip title={disabled || title} arrow placement={placement}>
      <IconButton color={color} size={size} onClick={onClick} disabled={disabled} style={style}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}
