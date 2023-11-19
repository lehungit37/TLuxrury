import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { CModalIds } from 'src/constants/modal';
import { FormInput } from 'src/components/hook_form';
import Loading from 'src/components/loading';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { addRole, getPermissionSchemes, getRoleList } from 'src/redux_store/role/role_action';
import { closeModal } from 'src/redux_store/common/modal_slice';
import { ERoleLevel } from 'src/types/enum';
import { IAddRole, IPermissionScheme } from 'src/types/role';
import { toastMessage } from 'src/utils/toast';

import { useStyles } from './styles';
import Permission from '../permission';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên vai trò'),
    description: yup.string(),
  })
  .required();

const ModalAddRole = () => {
  const classes = useStyles();

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [permissionList, setPermissionList] = useState<IPermissionScheme[]>([]);
  const [isLoadingGetPermission, setIsLoadingGetPermission] = useState<boolean>(false);

  const { payload } = useAppSelector((state) => state.roleSlice);
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPermissionSchemes(ERoleLevel.SYSTEM_USER))
      .unwrap()
      .then((data) => {
        setPermissionList(data);

        const checkedDefault: string[] = [];

        data.map((parent) => {
          if (parent.required) {
            parent.permissions.map((child) => {
              checkedDefault.push(child.id);
            });
          }
        });

        setCheckedList(checkedDefault);
        setIsLoadingGetPermission(false);
      })
      .catch(() => {
        setIsLoadingGetPermission(false);
      });
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal({ modalId: CModalIds.addRole }));
  };

  const onsubmit = (data: any) => {
    const role: IAddRole = {
      ...data,
      permissions: checkedList,
    };
    dispatch(addRole(role))
      .unwrap()
      .then(() => {
        toastMessage.success('Thêm vai trò thành công');
        dispatch(getRoleList(payload));
        handleCloseModal();
      })
      .catch((error) => {
        toastMessage.setErrors(error, setError);
      });
  };

  const renderContent = () => {
    if (isLoadingGetPermission) return <Loading />;

    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onsubmit)}
        flex={1}
        display="flex"
        flexDirection="column"
      >
        <FormInput control={control} name="name" label="Tên vai trò" />
        <FormInput control={control} name="description" label="Mô tả" />

        <Box flex={1}>
          <Permission
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            permissionList={permissionList}
          />
        </Box>
      </Box>
    );
  };

  return (
    <DialogWrapper
      isNotAutoClose
      maxWidthDialog="lg"
      classNames={classes.root}
      modalId={CModalIds.addRole}
    >
      <Box className={classes.form}>
        <Typography variant="h5" textAlign="center">
          Thêm vai trò
        </Typography>
        {renderContent()}
        <Grid container columnSpacing={1} justifyContent="flex-end">
          <Grid item>
            <Button onClick={handleCloseModal} variant="outlined">
              Hủy bỏ
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              disabled={isLoadingGetPermission}
              onClick={handleSubmit(onsubmit)}
              variant="contained"
            >
              Thêm mới
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default ModalAddRole;
