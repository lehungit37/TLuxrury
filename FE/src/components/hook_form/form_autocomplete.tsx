import { Autocomplete, Box, Chip, FormControl, SxProps, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface IProps {
  isMultiple?: boolean;
  control: Control<any, any>;
  name: string;
  label: string;
  options: any[];
  keyOption: string;
  labelOption: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  limitTags?: number;
  handleChange?: (name: string, value: any) => void;
  disableClearable?: boolean;
  getOptionDisabled?: (option: any) => boolean;
  notRemoveTag?: boolean;
  required?: boolean;
  sx?: SxProps;
}

export const FormAutocomplete = (props: IProps) => {
  const {
    isMultiple = false,
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
    handleChange,
    limitTags,
    disableClearable,
    getOptionDisabled,
    notRemoveTag = false,
    required,
    sx,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (option) => {
          return required ? !_.isEmpty(option) : true;
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error, invalid } }) => (
        <FormControl
          sx={sx}
          size={size}
          fullWidth
          margin={margin}
          error={invalid}
          required={required}
        >
          <Autocomplete
            multiple={isMultiple}
            fullWidth
            size={size}
            options={options}
            onChange={(event, item) => {
              if (_.isEqual(value, item)) return;

              onChange(item);
              if (handleChange) {
                handleChange(name, item);
              }
            }}
            noOptionsText="Không có lựa chọn"
            value={value}
            limitTags={limitTags}
            autoHighlight
            renderTags={
              notRemoveTag
                ? (tags) => {
                    return (
                      <Box display="flex" gap={0.5} flexWrap="wrap">
                        {tags.map((tag) => (
                          <Chip
                            key={tag[keyOption]}
                            size={size}
                            color="primary"
                            label={tag[labelOption]}
                          />
                        ))}
                      </Box>
                    );
                  }
                : undefined
            }
            disableClearable={disableClearable}
            isOptionEqualToValue={(option, optionValue) =>
              option?.[keyOption] === optionValue?.[keyOption]
            }
            disabled={disabled}
            getOptionDisabled={getOptionDisabled}
            getOptionLabel={(option) => option?.[labelOption] || ''}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={invalid}
                  helperText={error ? error.message || 'Vui lòng chọn trường này' : null}
                  label={label}
                  disabled={disabled}
                  variant={variant}
                />
              );
            }}
          />
        </FormControl>
      )}
    />
  );
};
