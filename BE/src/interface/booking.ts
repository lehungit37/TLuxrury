export interface IRoomBooking {
  customerName: string;
  customerPhone: string;
  fromDate: Date;
  toDate: Date;
  timeBooking: Date;
  userBooking: string;
  roomId: string;
  room: IRoomBooking;
}

export interface ICheckBooking {
  roomId: string;
  fromDate: Date;
  toDate: Date;
}
