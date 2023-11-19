export interface IRole {
  id: string;
  name: string;
  builtIn: boolean;
  level: number;
  description: string;
  permissions: string[];
  totalUser: number;
  roleFunction: string[];
}

export interface IPayloadRole {
  limit: number;
  page: number;
  keyword: string;
}

export interface IPermission {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface IPermissionScheme {
  id: string;
  name: string;
  description: string;
  required: boolean;
  permissions: IPermission[];
}

export interface IAddRole {
  name: string;
  description: '';
  permissions: string[];
}
