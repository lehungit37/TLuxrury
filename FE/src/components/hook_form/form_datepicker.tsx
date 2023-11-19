import React from 'react';
import { FormControl, SxProps, TextField } from '@mui/material';
import { CalendarPickerView, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

interface IProps {
  minDate?: Date
  views?: readonly CalendarPickerView[]
  control: Control<any, any>;
  name: string;
  label: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  sx?: SxProps;
  maxDate?: Date;
  handleChange?: (name: string, value: any) => void;
  inputFormat?: string
}

export const FormDatePicker = (props: IProps) => {
  const {
    minDate,
    views = ['year', 'month', "day"],
    control,
    sx,
    name,
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    required = false,
    maxDate,
    handleChange,
    inputFormat = "DD/MM/YYYY"
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl required={required} fullWidth size={size} margin={margin} sx={sx}>
            <DatePicker
              minDate={minDate ? moment(minDate).format() : undefined}
              maxDate={maxDate ? moment(maxDate).format() : undefined}
              inputFormat={inputFormat}
              views={views}
              disabled={disabled}
              label={label}
              value={new Date(value)}
              onChange={onChange}
              onAccept={(value) => {
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
