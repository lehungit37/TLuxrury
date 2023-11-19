import React from 'react';
import { FormControl, SxProps, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
  minRows: number;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  sx?: SxProps;
  handleChange?: (name: string, value: any) => void;
}

export const FormTextarea = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    minRows,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    required = false,
    handleChange,
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
        <FormControl required={required} fullWidth size={size} margin={margin} sx={sx}>
          <TextField
            multiline
            variant={variant}
            disabled={disabled}
            label={label}
            error={invalid}
            helperText={error ? error.message : null}
            minRows={minRows}
            maxRows={minRows}
            onChange={(e) => {
              const value = e.target.value;

              onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            value={value ? value : ''}
          />
        </FormControl>
      )}
    />
  );
};
