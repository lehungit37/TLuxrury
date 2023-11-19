import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";

import { config } from "../config";
import { apis } from "../api";
import logger from "../clog";

export class HttpServer {
  server: http.Server;
  constructor() {
    this.server = http.createServer();
  }

  setup = async () => {
    const app = express();
    // setup i18n
    app.use(cookieParser());
    // handlers
    app.use(express.json());
    app.use(compression());
    app.disable("x-powered-by");
    app.use(cors({ origin: "*", credentials: true }));
    app.use(morgan("dev"));
    app.use(config.apiPrefix, apis());
    app.use(this.handleError);

    this.server.addListener("request", app);
  };

  start = () => {
    if (!this.server.listening) {
      this.server.listen(config.httpPort, () => {
        logger.info(`Http server is running at port ${config.httpPort}`);
      });
    }
  };

  stop = () => {
    if (this.server.listening) {
      this.server.close();
    }
  };

  handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logger.error(`HTTP ${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);

      res.json(err);
    }
    next();
  };
}
