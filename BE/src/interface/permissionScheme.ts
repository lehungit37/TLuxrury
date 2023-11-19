export interface IPermission {
  id: string;
  name: string;
  description: string;
  required: boolean;
  privateLevel: 1 | 2;
}

export interface IPermissionSchemes {
  id: string;
  name: string;
  description: string;
  required: boolean;
  permissions: IPermission[];
}
