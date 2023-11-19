export interface IGroup {
  id?: string;
  name: string;
  description: string;
  apis?: IApiRequest[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IApiRequest {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | '';
  url: string;
  id: string;
  description: string;
  groupId?: string;
  params?: IParams[];
  queryParams?: IParams[];
}

export interface IApis {
  id?: string;
  name: string;
  description: string;
  isLocked: boolean;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  params: IParams[];
  queryParams: IParams[];
  body:
    | {
        type: string;
        key: string;
      }[];

  headers: IHeader[];
  // response: IResponse[] | string;
  response: IResponse[];
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IBody {
  type: 'Object' | 'Array' | 'String' | 'Number' | null;
  key: string | null;
  value: string | number | IBody | IBody[];
}

export interface IResponse {
  statusCode: number;
  descritpion?: string;
  links?: string | null;
  results: string | number | IBody | IBody[];
}

export interface IParams {
  key: string;
  description: string;
  value?: string;
  required?: boolean;
}

export interface IHeader {
  key: string;
  value: string;
}

export interface IPayloadUpdateRequest {
  name?: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  queryParams?: IParams[];
  params?: IParams[];
  body?: { type: string; key: string }[];
  headers?: IHeader[];
  response?: IResponse[];
}

export interface IPayloadUpdateBody {
  type: 'Json' | 'FormData';
  value: IBody;
}

export interface IGroupSearch {
  searchKeyword: string;
}

export type TTypeTab = 'params' | 'queryParams' | 'body' | 'headers' | 'response';
