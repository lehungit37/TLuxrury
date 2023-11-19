import { AppError } from "./../models/util";
import store from "../stores";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import {
  ERoomStatus,
  IPayloadGetRoom,
  IPayloadGetRoomManagement,
  IRoom,
} from "../interface/room";

export class RoomApp {
  async addRoom(room: any) {
    const roomId = await store
      .roomStore()
      .addRoom({
        ...room,
        status: ERoomStatus.FREE,
        isShow: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        promotion: room.promotion || 0,
        deletedAt: null,
      })
      .catch((error) => {
        throw new AppError(
          "app.room.creaetRoome",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    const newRoom = await store.roomStore().getById(roomId);
    return newRoom;
  }

  async checkExistRoomName(roomName: string) {
    const room = await store
      .roomStore()
      .getByName(roomName)
      .catch((error) => {
        throw new AppError(
          "app.room.checkExistRoomName",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return { isExist: !_.isEmpty(room), roomId: room?._id.toString() };
  }

  async getRoomManagement(payload: IPayloadGetRoomManagement) {
    const data = await store
      .roomStore()
      .getListRoom(payload)
      .catch((error) => {
        throw new AppError(
          "app.room.getData",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return data;
  }

  async countTotalData(payload: IPayloadGetRoomManagement) {
    const total = await store
      .roomStore()
      .countData(payload)
      .catch((error) => {
        throw new AppError(
          "app.room.getTotal",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return total;
  }

  async deleteRoom(roomId: string) {
    await store
      .roomStore()
      .deleteRoom(roomId)
      .catch((error) => {
        throw new AppError(
          "app.room.getTotal",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return;
  }

  async getById(roomId: string) {
    const result = await store
      .roomStore()
      .getById(roomId)
      .catch((error) => {
        throw new AppError(
          "app.room.getTotal",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return result;
  }

  async updateRoom(roomId: string, room: IRoom) {
    await store
      .roomStore()
      .updateRoom(roomId, { ...room, updatedAt: new Date() })
      .catch((error) => {
        throw new AppError(
          "app.room.getTotal",
          "Thêm phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    const newRoom = await this.getById(roomId).catch((error) => {
      throw new AppError(
        "app.room.getTotal",
        "Thêm phòng thất bại",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message
      );
    });

    return newRoom;
  }

  async getRoomManage(payload: IPayloadGetRoom) {
    const rooms = await store
      .roomStore()
      .getRoomManage(payload)
      .catch((error) => {
        throw new AppError(
          "app.room.getTotal",
          "Lấy danh sách phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return rooms;
  }
}
