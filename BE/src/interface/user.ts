import { ObjectId } from "mongodb";
import { IRole } from "./role";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  description: string;
  emailVerified: boolean;
  lastPasswordUpdate: null | Date;
  roleId: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  role?: IRole;
}

export interface IPayloadGetUser {
  page: number;
  limit: number;
  keyword: string;
}
