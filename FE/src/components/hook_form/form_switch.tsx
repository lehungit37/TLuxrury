import { FormControl, FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  handleChange?: (name: string, value: any) => void;
}

export const FormSwitch = (props: IProps) => {
  const {
    control,
    name,
    label,
    size = 'small',
    disabled = false,
    margin = 'dense',
    handleChange,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FormControl size={size} fullWidth margin={margin}>
          <FormControlLabel
            disabled={disabled}
            control={
              <Switch
                size={size}
                checked={Boolean(value)}
                onChange={(e) => {
                  onChange(e.target.checked);
                  if (handleChange) {
                    handleChange(name, e.target.checked);
                  }
                }}
                disabled={disabled}
              />
            }
            label={label}
          />
        </FormControl>
      )}
    />
  );
};
