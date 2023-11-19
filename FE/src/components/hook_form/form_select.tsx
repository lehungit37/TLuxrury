import React, { useState } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SxProps,
} from '@mui/material';
import { ClearOutlined } from '@mui/icons-material';
// import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SxProps } from '@mui/material';
// import React from 'react';

import _ from 'lodash';
import { Control, Controller } from 'react-hook-form';
import Loading from '../loading';

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
  options: any[];
  keyOption: string;
  labelOption: string;
  required?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  loading?: boolean;
  optionsDisabled?: string[];
  handleChange?: (name: string, value: any) => void;
  sx?: SxProps;
  deleteOption?: {
    onDelete: (id: string) => void;
    isDeleting: boolean;
  };
}

export const FormSelect = (props: IProps) => {
  const {
    control,
    name,
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    options,
    keyOption,
    labelOption,
    optionsDisabled = [],
    loading = false,
    deleteOption,
    required = false,
    handleChange,
    sx,
  } = props;

  const [deletingId, setDeletingId] = useState(null);

  const renderDeleteIcon = (value: string, option: any) => {
    if (!deleteOption || option[keyOption] === value || option[keyOption] === 'all') return null;
    if (deleteOption.isDeleting && deletingId === option[keyOption])
      return <CircularProgress size={22} />;

    return (
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          deleteOption.onDelete(option[keyOption]);
          setDeletingId(option[keyOption]);
        }}
      >
        <ClearOutlined fontSize="small" />
      </IconButton>
    );
  };

  const renderOptions = (value: string) => {
    if (loading) {
      return <Loading marginTop={1} />;
    }

    if (options.length === 0) {
      return <MenuItem disabled>Không có lựa chọn</MenuItem>;
    }

    return options.map((option, index) => (
      <MenuItem
        key={index}
        disabled={optionsDisabled.includes(option[keyOption]) && value !== option[keyOption]}
        value={option[keyOption]}
      >
        {deleteOption ? (
          <>
            <ListItemText primary={option[labelOption]} />
            {renderDeleteIcon(value, option)}
          </>
        ) : (
          option[labelOption]
        )}
      </MenuItem>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng chọn trường này!',
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl sx={sx} fullWidth margin={margin} size={size} error={invalid}>
          <InputLabel size={size === 'medium' ? 'normal' : 'small'} variant={variant}>
            {label}
          </InputLabel>

          <Select
            label={label}
            value={options.length ? value || '' : ''}
            onChange={(e) => {
              if (_.isEqual(value, e.target.value) || loading) return;
              onChange(e);
              if (handleChange) {
                handleChange(name, e.target.value);
              }
            }}
            size={size}
            disabled={disabled}
          >
            {renderOptions(value)}
          </Select>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
