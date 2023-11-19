import { IRole } from './role';

export interface IUser {
  id: string;
  name: string;
  email: string;
  workplace: string;
  address: string;
  description: string;
  phoneNumber: string;
  role: IRole;
  roleId: string;
  mfaActive: boolean;
  emailVerified: boolean;
}

export interface IFormAddUser {
  name: string;
  email: string;
  phoneNumber: string;
  workplace: string;
  address: string;
  description: string;
}

export interface IUserAdd extends IFormAddUser {
  roleId: string;
}

export interface IPayloadGetUser {
  limit: number;
  page: number;
  keyword: string;
  accountSocial: boolean;
}

export interface IUpdateUser {
  name?: string;
  phoneNumber?: string;
  workplace?: string;
  address?: string;
  description?: string;
  roleId?: string;
}
