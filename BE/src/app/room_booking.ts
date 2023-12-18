import { AppError } from "./../models/util";
import { IRoomBooking } from "../interface/booking";
import store from "../stores";
import { StatusCodes } from "http-status-codes";

export class RoomBookingApp {
  constructor() {}
  async createBooking(data: IRoomBooking) {
    const id = await store
      .roomBookingStore()
      .createBooking(data)
      .catch((error) => {
        throw new AppError(
          "app.roomBooking.createBooking",
          "Đặt phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });

    const booking = await store.roomBookingStore().getById(id);
    return booking;
  }

  async checkBooking(payload: {
    fromDate: Date;
    toDate: Date;
    roomId: string;
  }) {
    const result = await store
      .roomBookingStore()
      .checkBooking(payload)
      .catch((error) => {
        throw new AppError(
          "app.roomBooking.checkBooking",
          "Kiểm tra đặt phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });

    if (!result) return true;
    return false;
  }

  async getRoomBookingManagent(payload: { startDate: Date; endDate: Date }) {
    const data = await store.roomBookingStore().getListRoomBooking(payload);

    return data;
  }

  async delete(id: string) {
    await store
      .roomBookingStore()
      .delete(id)
      .catch((error) => {
        throw new AppError(
          "app.roomBooking.delete",
          "Xoá dặt phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });

    return;
  }

  async update(id: string, data: IRoomBooking) {
    console.log("Vao day");

    await store
      .roomBookingStore()
      .update(id, data)
      .catch((error) => {
        throw new AppError(
          "app.roomBooking.update",
          "Cập nhật phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });

    return;
  }
  async getByRoomId(roomId: string) {
    const result = await store.roomBookingStore().getByRoomId(roomId);

    return result || [];
  }
}
