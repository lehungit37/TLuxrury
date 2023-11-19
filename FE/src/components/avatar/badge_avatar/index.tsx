import React, { ReactNode } from 'react';
import { Badge } from '@mui/material';

import { TMuiColor } from 'src/types/common';
import { useStyles } from './styles';

interface IBadgeAvatarProps {
  children?: ReactNode;
  color?: TMuiColor;
  className?: string;
}

function BadgeAvatar(props: IBadgeAvatarProps) {
  const { color = 'default', className } = props;
  const classes = useStyles();

  return (
    <Badge
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      overlap="circular"
      badgeContent=" "
      color={color}
      variant="dot"
      classes={{
        badge: className ? className : classes.bagde,
      }}
    >
      {props.children}
    </Badge>
  );
}

export default BadgeAvatar;
