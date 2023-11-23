import { PermissionSchemes } from 'src/constants/role';
import React from 'react';

import AdminLayout from 'src/layout/admin_layout';
import AuthLayout from 'src/layout/auth_layout';
import NotFound from 'src/components/not_found';
import Login from 'src/pages/auth/login';
import Register from 'src/pages/auth/register';
import VerifyPassword from 'src/pages/auth/verify_password';
import SendEmail from 'src/pages/auth/send_email';
import UserManagement from 'src/pages/user_management';
import RoleManagement from 'src/pages/role_management';
import Home from 'src/pages/home';
import BookingManagement from 'src/pages/booking_management';
import RevenueManagement from 'src/pages/revenue_management';
import RoomManagement from 'src/pages/room_management';

import { IRoute } from 'src/types/route';
import { CPath } from './path';

export const CRouteList: IRoute[] = [
  {
    path: CPath.login,
    name: 'Đăng nhập',
    component: Login,
    layout: AuthLayout,
  },
  {
    path: CPath.register,
    name: 'Đăng ký',
    component: Register,
    layout: AuthLayout,
  },
  {
    path: CPath.verifyPassword,
    name: 'Thay đổi mật khẩu',
    component: VerifyPassword,
    layout: AuthLayout,
  },
  {
    path: CPath.sendEmail,
    name: 'Thay đổi mật khẩu',
    component: SendEmail,
    layout: AuthLayout,
  },

  {
    path: CPath.userManagement,
    name: 'Quản lý người dùng',
    component: UserManagement,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },
  {
    path: CPath.roleManagement,
    name: 'Quản lý vai trò',
    component: RoleManagement,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },
  {
    path: CPath.rooManagement,
    name: 'Quản lý phòng',
    component: RoomManagement,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },
  {
    path: CPath.revenueManagement,
    name: 'Thống kê',
    component: RevenueManagement,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },
  {
    path: CPath.home,
    name: 'Trang chủ',
    component: Home,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },
  {
    path: CPath.bookingManagement,
    name: 'Đặt phòng',
    component: BookingManagement,
    layout: AdminLayout,
    // permission: [PermissionSchemes.getListUser],
  },

  {
    path: CPath.notFound,
    name: 'Không tìm thấy trang',
    component: NotFound,
  },
];
