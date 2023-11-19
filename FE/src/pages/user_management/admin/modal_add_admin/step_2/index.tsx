import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { FormSelect } from 'src/components/hook_form';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getAllRole, getPermissionSchemes, getRoleDetail } from 'src/redux_store/role/role_action';
import { addAdmin, getUserList } from 'src/redux_store/user/user_actions';
import { IPermissionScheme, IRole } from 'src/types/role';
import { IFormAddUser } from 'src/types/user';
import { toastMessage } from 'src/utils/toast';
import Permission from 'src/pages/role_management/permission';

type Props = {
  handleChangeStep: (step: 1 | -1) => void;
  handleCloseModal: () => void;
  userForm: IFormAddUser;
};

const Step2AddAdmin = (props: Props) => {
  const { handleCloseModal, handleChangeStep, userForm } = props;

  const dispatch = useAppDispatch();
  const { payload } = useAppSelector((state) => state.userSlice);
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      roleId: '',
    },
  });

  const isLoadingAddUser = useIsRequestPending('user', 'addUser');

  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [permissionList, setPermissionList] = useState<IPermissionScheme[]>([]);

  const handleClose = () => {
    handleCloseModal();
  };

  const getPermissionList = (roleLevel: number) => {
    dispatch(getPermissionSchemes(roleLevel))
      .unwrap()
      .then((data) => {
        setPermissionList(data);
      });
  };

  const handleChangeRole = (name: string, value: any) => {
    dispatch(getRoleDetail(value))
      .unwrap()
      .then((data) => {
        setCheckedList(data.permissions);
        getPermissionList(data.level);
      });
  };

  useEffect(() => {
    dispatch(getAllRole())
      .unwrap()
      .then((data) => {
        setRoleList(data);
        if (data.length) {
          setValue('roleId', data[0].id as string);
          setCheckedList(data[0].permissions);
          getPermissionList(data[0].level);
        }
      });
  }, []);

  const handleBack = () => {
    handleChangeStep(-1);
  };

  const onSubmit = (data: any) => {
    const { roleId } = data;
    const user = { ...userForm, roleId };

    dispatch(addAdmin(user))
      .unwrap()
      .then(() => {
        toastMessage.success('Thêm user thành công');
        handleClose();
        dispatch(getUserList(payload));
      });
  };

  return (
    <Grid container flexDirection="column" height="100%">
      <Grid item flex={1}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          py={1}
          px={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item md={4}>
              <FormSelect
                control={control}
                label="Vai trò"
                name="roleId"
                keyOption="id"
                labelOption="name"
                options={roleList}
                handleChange={handleChangeRole}
              />
            </Grid>
          </Grid>
          <Box flex={1} pt={1}>
            <Permission
              checkedList={checkedList}
              permissionList={permissionList}
              setCheckedList={setCheckedList}
              disabledAll
            />
          </Box>
        </Box>
      </Grid>

      <Grid item>
        <Grid container columnSpacing={1} justifyContent="flex-end">
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              Hủy bỏ
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleBack}>
              Quay lại
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              loading={isLoadingAddUser}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Thêm mới
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Step2AddAdmin;
