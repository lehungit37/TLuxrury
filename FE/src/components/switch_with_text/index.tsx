import React from 'react';

import { Grid, Typography, Switch, FormControlLabel, Collapse } from '@mui/material';

type Props = {
  name: string;
  title: string;
  statusSwitch: boolean;
  isHiddenSwitch?: boolean;
  contentExpend?: JSX.Element;
  onChange?: (name: string, status: boolean) => void;
};

const SwitchWithText = (props: Props) => {
  const { name, title, statusSwitch, contentExpend, isHiddenSwitch, onChange } = props;

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (onChange) {
      onChange(name, checked);
    }
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
        {!isHiddenSwitch && (
          <Grid item>
            <FormControlLabel
              checked={statusSwitch}
              labelPlacement="start"
              control={<Switch name={name} onChange={handleChangeSwitch} />}
              label={statusSwitch ? 'Bật' : 'Tắt'}
            />
          </Grid>
        )}
      </Grid>
      <Collapse in={Boolean(contentExpend) && statusSwitch}>{contentExpend}</Collapse>
    </>
  );
};

export default SwitchWithText;
