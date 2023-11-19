import { StatusCodes } from "http-status-codes";
import { AppError } from "../models/util";
import store from "../stores";

export class RoomTypesApp {
  constructor() {}

  async getAll() {
    const result = await store
      .roomRoomTypesStore()
      .getAll()
      .catch((error) => {
        throw new AppError(
          "roomType.app",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });

    return result;
  }
}
