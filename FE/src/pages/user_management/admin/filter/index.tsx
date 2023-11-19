import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Box, Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { CModalIds } from 'src/constants';
import { useDelayTimeout } from 'src/hooks';
import { useAppSelector, useAppDispatch } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal_slice';
import { getUserList } from 'src/redux_store/user/user_actions';
import { changePayloadUser, setSelectedId } from 'src/redux_store/user/user_slice';
import { IPayloadGetUser } from 'src/types/user';
import { FormInput } from 'src/components/hook_form';
import ModalAddAdmin from '../modal_add_admin';

const AdminFilter = () => {
  const dispatch = useAppDispatch();
  const { control } = useForm({
    defaultValues: {
      keyword: '',
    },
  });
  const delayTimeout = useDelayTimeout();

  const handleOpenModalAddUser = () => {
    dispatch(openModal({ modalId: CModalIds.addUser, modalComponent: <ModalAddAdmin /> }));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Box>
          {/* <FormInput
            control={control}
            label="Tìm kiếm"
            name="keyword"
            handleChange={handleChangeKeyword}
          /> */}
        </Box>
      </Grid>
      <Grid item>
        <Button variant="outlined" startIcon={<AddOutlined />} onClick={handleOpenModalAddUser}>
          Thêm user
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminFilter;
