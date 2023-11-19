import { IGetRoom, IPayloadGetRooms, IRoom, IRoomType } from 'src/types/room';
import { createClient } from './axios_client';
import qs from 'query-string';

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
};
