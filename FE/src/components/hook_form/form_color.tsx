import { Box, Button, FormControl, InputAdornment, Popover, Stack, SxProps, TextField } from '@mui/material';
import React from 'react';
import { ChromePicker } from 'react-color';
import { Control, Controller } from 'react-hook-form';
import RectangleIcon from '@mui/icons-material/Rectangle';

interface IProps {
    control: Control<any, any>;
    name: string;
    colorValue: string,
    label: string;
    size?: 'small' | 'medium';
    disabled?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
    margin?: 'none' | 'dense' | 'normal';
    type?: 'text' | 'password' | 'number';
    required?: boolean;
    sx?: SxProps;
    handleChange?: (name: string, value: any) => void;
}

export const FormColor = (props: IProps) => {
    const {
        control,
        sx,
        name,
        colorValue,
        label,
        size = 'small',
        disabled = false,
        variant = 'outlined',
        margin = 'dense',
        required = false,
        handleChange,
    } = props;

    const [color, setColor] = React.useState<string>(colorValue || "#FFFFFF")
    const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | SVGSVGElement | null>(null);

    const handleClick = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <Stack direction='row' alignItems='center' spacing={1} width="100%">
                    <FormControl required={required} fullWidth size={size} margin={margin} sx={sx} style={{ position: "relative" }}>
                        <TextField
                            fullWidth
                            size={size}
                            variant={variant}
                            disabled={disabled}
                            label={label}
                            error={invalid}
                            helperText={error ? error.message : null}
                            onClick={handleClick}
                            value={value || ""}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <RectangleIcon fontSize={"large"} sx={{
                                        color: value || "white", borderRadius: 5
                                    }} onClick={
                                        handleClick
                                    } />
                                </InputAdornment>
                            }}
                        />

                    </FormControl>


                    <Popover
                        open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{
                            "& > .chrome-picker": {
                                boxShadow: "none !important"
                            }
                        }}>
                            <ChromePicker color={color} onChangeComplete={(color) => {
                                setColor(color.hex)
                            }} />
                            <Button variant="text" sx={{ width: '100%' }} onClick={() => {
                                onChange(color)
                                if (handleChange) {
                                    handleChange(name, color);
                                }
                                handleClose()
                            }}>
                                Chọn
                            </Button>
                        </Box>
                    </Popover>
                </Stack>
            )}
        />
    );
};
