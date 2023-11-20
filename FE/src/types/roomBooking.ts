import { IRoom } from './room';

export interface IRoomBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  fromDate: Date;
  toDate: Date;
  timeBooking: Date;
  userBooking: string;
  roomId: string;
  room: IRoom;
  isVerified: boolean;
}

export interface IPayloadGetRoomBooking {
  page: number;
  limit: number;
  roomId?: string;
}
