import { Box, BoxProps, styled } from '@mui/material';

export const TableBoxLayout = styled(Box)<BoxProps>(({ theme }) => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  overflow: 'hidden',
}));

export const TableFilterLayout = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: theme.palette.common.white,
}));

export const TableContentLayout = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flex: 1,
  gap: theme.spacing(1),
  height: '100%',
}));
