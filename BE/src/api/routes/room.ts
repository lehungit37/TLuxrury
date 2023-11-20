import { NextFunction, Request, Response, Router } from "express";
import { RoomApp } from "../../app/room_app";
import { IErrors } from "../../interface/errors";
import {
  ERoomStatus,
  IPayloadGetRoom,
  IPayloadGetRoomManagement,
  IRoom,
} from "../../interface/room";
import { AppError, pushError } from "../../models/util";

export const roomRouter = (router: Router) => {
  router.get("/rooms/manage", getRoomShowManage);
  router.get("/rooms/get_room_can_booking", getRoomsCanBooking);
  router.get("/rooms/:roomId", getRoomDetail);
  router.get("/rooms", getListRoomManager);
  router.post("/rooms", addRoom);
  router.put("/rooms/:roomId", updateRoom);
  router.delete("/rooms/:roomId", deleteRoom);
};

const getRoomShowManage = async (
  req: Request<any, any, any, IPayloadGetRoom>,
  res: Response,
  next: NextFunction
) => {
  const payload = req.query;
  try {
    const rooms = await new RoomApp().getRoomManage(payload);
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const getListRoomManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = {
      ...req.query,
      page: Number(req.query?.page),
    } as IPayloadGetRoomManagement;
    const data = await new RoomApp().getRoomManagement(payload);
    const totalData = await new RoomApp().countTotalData(payload);

    res.json({ data, totalData });
  } catch (error) {
    next(error);
  }
};

const getRoomsCanBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.query;
    const result = await new RoomApp().getRoomCanBooing({
      fromDate: new Date(payload.fromDate as string),
      toDate: new Date(payload.toDate as string),
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
const getRoomDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = req.params.roomId;

    const room = await new RoomApp().getById(roomId);

    res.json(room);
  } catch (error) {
    next(error);
  }
};

const addRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const errors = <IErrors>{};

    if (!payload.name) {
      errors["name"] = pushError({
        id: "name.require",
        message: "Vui lòng nhập tên phòng",
      });
    }

    const { isExist } = await new RoomApp().checkExistRoomName(
      payload.name.trim()
    );

    if (isExist) {
      errors["name"] = pushError({
        id: "name.exist",
        message: "Tên phòng đã tồn tại",
      });
    }

    if (payload.promotion < 0) {
      errors["promotion"] = pushError({
        id: "nampromotione.require",
        message: "Khuyến mãi phải >=0",
      });
    }

    if (!payload.price || payload.price <= 0) {
      errors["price"] = pushError({
        id: "price.require",
        message: "Giá phòng phải > 0",
      });
    }

    const room = await new RoomApp().addRoom(payload);
    res.json(room);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body as IRoom;
    const roomId = req.params.roomId;

    const errors = <IErrors>{};

    if ("name" in payload) {
      if (!payload.name) {
        errors["name"] = pushError({
          id: "name.require",
          message: "Vui lòng nhập tên phòng",
        });
      }

      const { isExist, roomId: roomIdCurrent } =
        await new RoomApp().checkExistRoomName(payload.name.trim());

      if (isExist && roomIdCurrent !== roomId) {
        errors["name"] = pushError({
          id: "name.exist",
          message: "Tên phòng đã tồn tại",
        });
      }
    }

    if ("promotion" in payload) {
      if (payload.promotion < 0) {
        errors["promotion"] = pushError({
          id: "nampromotione.require",
          message: "Khuyến mãi phải >=0",
        });
      }
    }

    if ("price" in payload) {
      if (!payload.price || payload.price <= 0) {
        errors["price"] = pushError({
          id: "price.require",
          message: "Giá phòng phải > 0",
        });
      }
    }

    const newRoom = await new RoomApp().updateRoom(roomId, payload);
    res.json(newRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.params.roomId;

    await new RoomApp().deleteRoom(roomId);

    res.json("OK");
  } catch (error) {
    next(error);
  }
};
