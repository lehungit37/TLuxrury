import { Router } from "express";
import { permissionRouter } from "./routes/permission";
import { roleRouter } from "./routes/roles";
import { roomRouter } from "./routes/room";
import { roomTypesRouter } from "./routes/room_types";
import { userRouter } from "./routes/user_router";

export function apis(): Router {
  const router = Router();
  userRouter(router);
  roomRouter(router);
  roleRouter(router);
  permissionRouter(router);
  roomTypesRouter(router);
  return router;
}
