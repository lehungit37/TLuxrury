import { RoomTypesApp } from "./../../app/room_types";
import { NextFunction, Response, Router, Request } from "express";

export const roomTypesRouter = (router: Router) => {
  router.get("/room_types", getListRoomTypes);
};

const getListRoomTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await new RoomTypesApp().getAll();

    res.json(result);
  } catch (error) {
    next(error);
  }
};
