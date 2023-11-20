import { IRouter, NextFunction, Request, Response } from "express";
import { RoomBookingApp } from "../../app/room_booking";

export const roomBookingRouter = (router: IRouter) => {
  router.post("/room_booking", createBooking);
  router.get("/room_booking/check_booking", checkBooking);
  router.get("/room_booking", getListRoomBooking);
  router.delete("/room_booking/:id", deleteBooking);
  router.put("/room_booking/:id", updateBooking);
};

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    await new RoomBookingApp().createBooking({
      ...data,
      timeBooking: new Date(),
      userBooking: "65426946dbb750f5f52f5fa6",
    });

    res.json("Ok");
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
      page: Number(payload.page),
      limit: Number(payload.limit),
      keyword: payload.keyword,
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
