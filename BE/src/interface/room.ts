import { ObjectId } from "mongodb";

export interface IPayloadGetRoomManagement {
  page: number;
  roomTypeId: string;
  searchKeyword: string;
}

export interface IRoom {
  id: string;
  name: string;
  bed: {
    amount: number;
    type: "single" | "double";
  };
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  description: string;
  isShow: boolean;
  price: number;
  promotion: number;
  roomTypeId: string | ObjectId;
  roomTypes: { id: string; name: string };
  status: ERoomStatus;
  television: {
    status: boolean;
    description: string;
  };
}

export enum ERoomStatus {
  FREE = "free",
  WORKING = "working",
  UPDATING = "updating",
}

export interface IPayloadGetRoom {
  status?: ERoomStatus;
  roomTypeId: string;
}
