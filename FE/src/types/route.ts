/* eslint-disable @typescript-eslint/ban-types */

import React from 'react';

type TComponent = React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);

export interface IRoute {
  path: string;
  component: TComponent;
  name: string;
  layout?: (props: { children: JSX.Element }) => JSX.Element;
  permission?: string[];

  //default = false, if in Sitech, default = true
  isNotDefaultRoute?: boolean;
}

export interface IMenuRoute {
  title: string;
  icon: any;
  // | (() => JSX.Element)
  // | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  //     muiName: string;
  //   });
  activeIcon: any;
  // | (() => JSX.Element)
  // | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  //     muiName: string;
  //   });
  path: string;
  subMenu?: IMenuRoute[];
  permission?: string[];
  isShow: boolean;
  isExpandSetting: boolean;
}
