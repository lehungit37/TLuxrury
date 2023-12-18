import { IGetRoom, IPayloadGetRooms, IRoom, IRoomType } from 'src/types/room';
import { createClient } from './axios_client';
import qs from 'query-string';
import { IRoomBooking } from 'src/types/roomBooking';

const client = createClient('http://10.49.46.54:9000/api/v1');

export const roomApi = {
  getRoomTypes: () => {
    return client.get<IRoomType[]>('/room_types');
  },

  addRoom: (room: any) => {
    return client.post<any>('/rooms', room);
  },

  getRoomsManagement: (payload: IPayloadGetRooms) => {
    const query = qs.stringify(payload);
    return client.get<{ data: IRoom[]; totalData: number }>(`/rooms?${query}`);
  },

  deleteRoom: (roomId: string) => {
    return client.delete<any>(`/rooms/${roomId}`);
  },

  getRoomDetail: (roomId: string) => {
    return client.get<IRoom>(`/rooms/${roomId}`);
  },

  updateRoom: ({ roomId, newRoom }: { roomId: string; newRoom: IRoom }) => {
    return client.put<IRoom>(`/rooms/${roomId}`, newRoom);
  },

  getRoomsShow: (payload: IGetRoom) => {
    const query = qs.stringify(payload);
    return client.get<IRoom[]>(`/rooms/manage?${query}`);
  },

  getRoomCanBooking: (payload: { fromDate: Date; toDate: Date }) => {
    const query = qs.stringify(payload);
    return client.get<IRoom[]>(`/rooms/get_room_can_booking?${query}`);
  },

  createBooking: (data: IRoomBooking) => {
    return client.post('room_booking', data);
  },

  checkCanCreateBooking: (payload: { roomId: string; fromDate: Date; toDate: Date }) => {
    const query = qs.stringify(payload);

    return client.get(`/room_booking/check_booking?${query}`);
  },

  getRoomBookingManagemnt: (payload: { startDate: Date; endDate: Date }) => {
    const query = qs.stringify(payload);

    return client.get(`/room_booking?${query}`);
  },
  deleteRoomBooking: (id: string) => {
    return client.delete(`/room_booking/${id}`);
  },
  updateRoomBooking: (id: string, data: any) => {
    return client.put(`/room_booking/${id}`, data);
  },

  getRoomBookingByRoomId: (roomId: string) => {
    return client.get<IRoomBooking[]>(`/rooms/${roomId}/bookings`);
  },
};
