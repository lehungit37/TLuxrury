import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import Scrollbars from 'react-custom-scrollbars-2';
import _ from 'lodash';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { IPermissionScheme } from 'src/types/role';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './styles.css';
interface INode {
  value: string;
  label: string;
  children?: INode[];
  required: boolean;
  disabled: boolean;
}

type Props = {
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  disabledAll?: boolean;
  permissionList: IPermissionScheme[];
};

const Permission = (props: Props) => {
  const { checkedList, setCheckedList, disabledAll, permissionList = [] } = props;

  const [expandedList, setExpanded] = useState<string[]>([]);

  const [permissionDisabledList, setPermissionDisabledList] = useState<string[]>([]);

  //set expanded
  // useEffect(() => {
  //   const idList: string[] = [];
  //   permissionList.map((parent) => {
  //     idList.push(parent.id);
  //   });

  //   setExpanded(idList);
  // }, [permissionList]);

  useEffect(() => {
    const disabledList: string[] = [];

    permissionList.map((parent) => {
      parent.permissions.map((child) => {
        if (checkedList.includes(child.id) && !child.required) {
          parent.permissions.map((childRequire) => {
            if (childRequire.required && !permissionDisabledList.includes(childRequire.id)) {
              disabledList.push(childRequire.id);
            }
          });
        }
      });
    });

    setPermissionDisabledList(disabledList);
  }, [permissionList]);

  const convertData = (permissionList: IPermissionScheme[]) => {
    const newData: INode[] = [];
    permissionList?.map((parent) => {
      const nodeChildren: INode[] = [];

      parent.permissions?.map((child) => {
        nodeChildren.push({
          label: child.name,
          value: child.id,
          required: child.required, // save variant require
          disabled: parent.required || disabledAll || permissionDisabledList.includes(child.id),
        });
      });

      newData.push({
        label: parent.name,
        value: parent.id,
        children: nodeChildren,
        disabled: parent.required,
        required: parent.required,
      });
    });

    return newData;
  };

  const changePermissionDisabled = (permissionRequire: string[], isRemove?: boolean) => {
    const newArrayRequired = isRemove
      ? _.difference(permissionDisabledList, permissionRequire)
      : _.union(permissionDisabledList, permissionRequire);
    setPermissionDisabledList(newArrayRequired);
  };

  const findAndSetRequiredId = (arrayChildren: INode[], value: string) => {
    const permissionRequire: string[] = [];

    arrayChildren.map((child) => {
      if (child.required && child.value !== value) {
        permissionRequire.push(child.value);
      }
    });

    return permissionRequire;
  };

  const handleCheck = (checked: string[], targetNode: any) => {
    const { children, parent, value } = targetNode;

    if (!children) {
      const arrayChildren: INode[] = parent.children;

      const permissionRequire = findAndSetRequiredId(arrayChildren, value);

      changePermissionDisabled(permissionRequire);
      const newListChecked = _.union(checked, permissionRequire);
      setCheckedList(newListChecked);

      return;
    }
    const permissionRequire = findAndSetRequiredId(children, value);

    changePermissionDisabled(permissionRequire);

    setCheckedList(checked);
  };

  const handleUnCheck = (checked: string[], targetNode: any) => {
    const { children, parent, value } = targetNode;

    if (!children) {
      const arrayChildren: INode[] = parent.children;

      const childIdList: string[] = [];
      const childIdRequireList: string[] = [];
      arrayChildren.map((child) => {
        if (!child.required) {
          childIdList.push(child.value);
        } else {
          childIdRequireList.push(child.value);
        }
      });

      const existChildNotRequiredList = _.intersection(checkedList, childIdList);
      if (existChildNotRequiredList.length === 1) {
        const permissionRequire = findAndSetRequiredId(arrayChildren, value);
        const newDisabled = _.difference(permissionDisabledList, permissionRequire);
        setPermissionDisabledList(newDisabled);
      }

      setCheckedList(checked);
      return;
    }

    const allChildrenId: string[] = [];
    children.map((child: INode) => {
      allChildrenId.push(child.value);
    });

    const newChecked = _.difference(checked, allChildrenId);

    const permissionRequire = findAndSetRequiredId(children, value);
    changePermissionDisabled(permissionRequire, true);
    setCheckedList(newChecked);
  };

  const handleCheckPermission = (checked: string[], targetNode: any) => {
    const { checked: isCheck } = targetNode;
    if (isCheck) {
      handleCheck(checked, targetNode);
    } else {
      handleUnCheck(checked, targetNode);
    }
  };

  return (
    <Scrollbars>
      <CheckboxTree
        nodes={convertData(permissionList)}
        checked={checkedList}
        expanded={expandedList}
        disabled={disabledAll}
        onCheck={(checked, targetNode) => {
          handleCheckPermission(checked, targetNode);
        }}
        onExpand={(expanded) => {
          setExpanded(expanded);
        }}
        icons={{
          check: <CheckBox color="primary" className="rct-icon rct-icon-check" />,
          uncheck: <CheckBoxOutlineBlank color="secondary" className="rct-icon rct-icon-uncheck" />,
          halfCheck: (
            <IndeterminateCheckBox color="primary" className="rct-icon rct-icon-half-check" />
          ),
          expandClose: <ExpandMore className="rct-icon rct-icon-expand-close" />,
          expandOpen: <ExpandLess className="rct-icon rct-icon-expand-open" />,
        }}
      />
    </Scrollbars>
  );
};

export default Permission;
