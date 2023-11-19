import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from 'src/components/hook_form';
import Permission from 'src/pages/role_management/permission';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getAllRole, getPermissionSchemes, getRoleDetail } from 'src/redux_store/role/role_action';
import { updateUser } from 'src/redux_store/user/user_actions';
import { IPermissionScheme, IRole } from 'src/types/role';
import { toastMessage } from 'src/utils/toast';

const ConfigPermission = () => {
  const { userInfo, selectedId } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.myAccountSlice);
  const { control, handleSubmit } = useForm({ defaultValues: { roleId: userInfo.roleId } });
  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [permissionList, setPermissionList] = useState<IPermissionScheme[]>([]);
  const dispatch = useAppDispatch();

  const getPermissionList = (roleLevel: number) => {
    dispatch(getPermissionSchemes(roleLevel))
      .unwrap()
      .then((data) => {
        setPermissionList(data);
      });
  };
  useEffect(() => {
    getPermissionList(userInfo.role.level);
    setCheckedList(userInfo.role.permissions);
    dispatch(getAllRole())
      .unwrap()
      .then((data) => {
        setRoleList(data);
      });
  }, []);

  const handleChangeRole = (name: string, value: string) => {
    dispatch(getRoleDetail(value))
      .unwrap()
      .then((data) => {
        setCheckedList(data.permissions);
        getPermissionList(data.level);
      });
  };

  const onSubmit = (data: { roleId: string }) => {
    dispatch(updateUser({ user: { roleId: data.roleId }, userId: selectedId }))
      .unwrap()
      .then(() => {
        toastMessage.success('Cập nhật người dùng thành công');
      });
  };

  const getDisabled = () => {
    if (!me) return true;

    return me.role?.level === userInfo.role?.level;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      py={2}
      px={1}
      component="form"
      id="update_role"
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
            disabled={getDisabled()}
          />
        </Grid>
      </Grid>
      <Box flex={1}>
        <Permission
          checkedList={checkedList}
          permissionList={permissionList}
          setCheckedList={setCheckedList}
          disabledAll
        />
      </Box>
    </Box>
  );
};

export default ConfigPermission;
