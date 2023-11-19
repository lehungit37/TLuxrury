export interface IRoomType {
  id: string;
  name: string;
}

export interface IPayloadGetRooms {
  roomTypeId: string;
  searchKeyword: string;
  page: number;
  limit: number;
}

export enum ERoomStatus {
  FREE = 'free',
  WORKING = 'working',
  UPDATING = 'updating',
}

export interface IGetRoom {
  status: ERoomStatus | string;
  roomTypeId: string;
}

export interface IRoom {
  id: string;
  name: string;
  bed: {
    amount: number;
    type: 'single' | 'double';
  };
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  description: string;
  isShow: boolean;
  price: number;
  promotion: number;
  roomTypeId: string;
  roomTypes: { _id: string; name: string };
  status: ERoomStatus;
  television: {
    status: boolean;
    description: string;
  };
}
