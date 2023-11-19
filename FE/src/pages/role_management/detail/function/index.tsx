import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import _, { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormInput } from 'src/components/hook_form';
import Loading from 'src/components/loading';
import { useIsRequestPending } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getPermissionSchemes, getRoleDetail, updateRole } from 'src/redux_store/role/role_action';
import { toastMessage } from 'src/utils/toast';

import Permission from '../../permission';
import { useStyles } from './styles';
import { ERoleLevel } from 'src/types/enum';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên vai trò'),
    description: yup.string(),
  })
  .required();

const RoleFunction = () => {
  const { roleInfo, selectedId, permissionList } = useAppSelector((state) => state.roleSlice);
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const isLoadingGetDetail = useIsRequestPending('role', 'getRoleDetail');

  const [isLoadingGetPermission, setIsLoadingGetPermission] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // const [expanded, setExpanded] = useState<string[]>([]);

  const { control, handleSubmit, setValue, setError } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: roleInfo.name,
      description: roleInfo.description,
    },
  });

  useEffect(() => {
    if (!isEmpty(roleInfo)) {
      setValue('name', roleInfo.name);
      setValue('description', roleInfo.description);
    }
  }, [roleInfo]);

  useEffect(() => {
    if (!selectedId) return;
    setIsLoadingGetPermission(true);
    dispatch(getRoleDetail(selectedId))
      .unwrap()
      .then((data) => {
        if (_.isEmpty(data)) return;
        const { level, permissions } = data;
        setCheckedList(permissions);
        dispatch(getPermissionSchemes(level))
          .unwrap()
          .then(() => {
            setIsLoadingGetPermission(false);
          })
          .catch(() => {
            setIsLoadingGetPermission(false);
          });
      });
  }, [selectedId]);

  useEffect(() => {
    const idList: string[] = [];
    permissionList.map((parent) => {
      idList.push(parent.id);
    });

    // setExpanded(idList);
  }, [permissionList]);

  const onSubmit = (data: any) => {
    const newRole = { ...data, permissions: checkedList };
    dispatch(updateRole({ roleId: roleInfo.id, newRole }))
      .unwrap()
      .then(() => {
        toastMessage.success('Cập nhật vai trò thành công');
      })
      .catch((errors) => {
        toastMessage.setErrors(errors, setError);
      });
  };

  if (isLoadingGetDetail) return <Loading />;

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} id="update_role">
        <FormInput disabled={roleInfo.builtIn} control={control} label="Tên vai trò" name="name" />
        <FormInput disabled={roleInfo.builtIn} control={control} label="Mô tả" name="description" />
      </form>
      <Box display="flex" flexDirection="column" flex={1} mt={1}>
        <Typography variant="h6">Chức năng</Typography>
        {isLoadingGetDetail || isLoadingGetPermission ? (
          <Loading />
        ) : roleInfo.level === ERoleLevel.SUPER_ADMIN ? (
          <Typography>Vai trò này có toàn bộ chức năng hệ thống </Typography>
        ) : (
          <Permission
            checkedList={checkedList}
            // expandedList={expanded}
            // setExpanded={setExpanded}
            setCheckedList={setCheckedList}
            disabledAll={roleInfo.builtIn}
            permissionList={permissionList}
          />
        )}
      </Box>
    </Box>
  );
};

export default RoleFunction;
