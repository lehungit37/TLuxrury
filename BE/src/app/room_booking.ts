import { AppError } from "./../models/util";
import { IRoomBooking } from "../interface/booking";
import store from "../stores";
import { StatusCodes } from "http-status-codes";

export class RoomBookingApp {
  constructor() {}
  async createBooking(data: IRoomBooking) {
    await store
      .roomBookingStore()
      .createBooking(data)
      .catch((error) => {
        throw new AppError(
          "app.roomBooking.createBooking",
          "Đặt phòng thất bại",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      });
    return "OK";
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

  async getRoomBookingManagent(payload: {
    page: number;
    limit: number;
    keyword: string;
  }) {
    const totalData = await store
      .roomBookingStore()
      .countRoomBookingList(payload);

    const data = await store.roomBookingStore().getListRoomBooking(payload);

    return { data, totalData };
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
}
