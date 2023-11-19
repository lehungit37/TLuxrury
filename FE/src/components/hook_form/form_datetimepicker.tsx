import React from 'react';
import { FormControl, SxProps, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { isEqual } from 'lodash';
import { Control, Controller } from 'react-hook-form';

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  minutesStep?: number;
  sx?: SxProps;
  maxDate?: Date;
  minDate?: Date;
  inputFormat?: string;
  handleChange?: (name: string, value: any) => void;
  handleChangeClick?: (name: string, value: any) => void;
}

export const FormDateTimePicker = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    required = false,
    minutesStep,
    handleChange,
    handleChangeClick,
    maxDate,
    minDate,
    inputFormat = 'DD/MM/YYYY HH:mm',
  } = props;

  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng nhập trường này!',
        },
      }}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl required={required} fullWidth size={size} margin={margin} sx={sx}>
            <DateTimePicker
              maxDateTime={maxDate ? dayjs(maxDate) : undefined}
              minDateTime={minDate ? dayjs(minDate) : undefined}
              disabled={disabled}
              label={label}
              value={value}
              minutesStep={minutesStep}
              inputFormat={inputFormat}
              onChange={(newValue) => {
                if (isEqual(value, newValue)) return;

                onChange(newValue);
                if (handleChangeClick) {
                  handleChangeClick(name, newValue);
                }
              }}
              onAccept={(newValue) => {
                if (isEqual(value, newValue)) return;

                if (handleChange) {
                  handleChange(name, value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={disabled}
                  size={size}
                  variant={variant}
                  fullWidth
                  error={invalid}
                  helperText={error ? error.message : null}
                />
              )}
            />
          </FormControl>
        </LocalizationProvider>
      )}
    />
  );
};
