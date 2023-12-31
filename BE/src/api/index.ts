import { Router } from "express";
import { invoiceRouter } from "./routes/invoice";
import { permissionRouter } from "./routes/permission";
import { roleRouter } from "./routes/roles";
import { roomRouter } from "./routes/room";
import { roomBookingRouter } from "./routes/room_booking";
import { roomTypesRouter } from "./routes/room_types";
import { userRouter } from "./routes/user_router";

export function apis(): Router {
  const router = Router();
  userRouter(router);
  roomRouter(router);
  roleRouter(router);
  permissionRouter(router);
  roomTypesRouter(router);
  roomBookingRouter(router);
  invoiceRouter(router);
  return router;
}
