import { IRouter, NextFunction, Request, Response } from "express";
import { RoomBookingApp } from "../../app/room_booking";
import { EPermission } from "../../interface/enum";
import {
  checkAuthorization,
  checkPermission,
} from "../middleware/authorization";

export const roomBookingRouter = (router: IRouter) => {
  router.post(
    "/room_booking",
    checkAuthorization,
    checkPermission(EPermission.ADD_BOOKING),
    createBooking
  );
  router.get(
    "/room_booking/check_booking",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_BOOKING),
    checkBooking
  );
  router.get(
    "/room_booking",
    checkAuthorization,
    checkPermission(EPermission.GET_LIST_BOOKING),
    getListRoomBooking
  );
  router.delete(
    "/room_booking/:id",
    checkAuthorization,
    checkPermission(EPermission.DELETE_BOOKING),
    deleteBooking
  );
  router.put(
    "/room_booking/:id",
    checkAuthorization,
    checkPermission(EPermission.UPDATE_BOOKING),
    updateBooking
  );
};

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const userId = req.headers.user_id || "";
    const booking = await new RoomBookingApp().createBooking({
      ...data,
      timeBooking: new Date(),
      userBooking: userId,
    });

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

const checkBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.query;
    const result = await new RoomBookingApp().checkBooking({
      roomId: payload.roomId as string,
      fromDate: new Date(payload.fromDate as string),
      toDate: new Date(payload.toDate as string),
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getListRoomBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: any = req.query;
    const data = await new RoomBookingApp().getRoomBookingManagent({
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    await new RoomBookingApp().delete(id);
    res.json("OK");
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await new RoomBookingApp().update(id, data);
    res.json("OK");
  } catch (error) {
    next(error);
  }
};
