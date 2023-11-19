export interface IPayloadGetRole {
  page: number;
  limit: number;
  keyword: string;
}

export interface IRole {
  id?: string;
  name: string;
  builtIn: boolean;
  level: number;
  description: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
