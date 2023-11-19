export interface IDataFilterUserLogs {
  userList: {
    id: string;
    name: string;
  }[];
  typeAction: {
    id?: string;
    name: string;
    type: string;
  }[];
}

export interface IUserLog {
  totalData: number;
  data: IUserLogEntries[];
}

export interface IFilterUserLogs {
  limit: number;
  page: number;
  fromTime: string;
  toTime: string;
  userId?: string;
  type?: string;
}
export interface IUserLogEntries {
  id: string;
  createdAt: string;
  description: string;
  user: {
    id: string;
    name: string;
  };
  action: {
    name: string;
    type: string;
  };
}
