import { AddOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'src/components/hook_form';
import { CModalIds } from 'src/constants/modal';
import { useDelayTimeout } from 'src/hooks/use_delay_timeout';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import { getRoleList } from 'src/redux_store/role/role_action';
import { changePayloadRole, setIdRoleSelected } from 'src/redux_store/role/role_slice';
import { IPayloadRole } from 'src/types/role';
import ModalAddRole from '../modal_add_role';

type Props = {
  handleChangeShowAllDetail: (status: boolean) => void;
};

const RoleFilter = ({ handleChangeShowAllDetail }: Props) => {
  const { control } = useForm({ defaultValues: { keyword: '' } });
  const { payload } = useAppSelector((state) => state.roleSlice);
  const dispatch = useAppDispatch();
  const delayTimeout = useDelayTimeout();
  const handleOpenModalAddRole = () => {
    dispatch(openModal({ modalId: CModalIds.addRole, modalComponent: <ModalAddRole /> }));
  };

  const handleChangeKeyword = (name: string, value: string) => {
    delayTimeout(() => {
      handleChangeShowAllDetail(false);
      const newPayload: IPayloadRole = { ...payload, keyword: '', page: 1 };
      dispatch(changePayloadRole(newPayload));
      dispatch(getRoleList(newPayload));
      dispatch(setIdRoleSelected(''));
    });
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      {/* <Grid item>
        <Box>
          <FormInput
            control={control}
            label="Tìm kiếm"
            name="keyword"
            handleChange={handleChangeKeyword}
          />
        </Box>
      </Grid> */}
      <Grid item>
        <Button variant="outlined" startIcon={<AddOutlined />} onClick={handleOpenModalAddRole}>
          Thêm vai trò
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoleFilter;
