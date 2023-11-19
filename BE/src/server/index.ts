import store from "../stores";
import { config } from "./../config/index";
import { HttpServer } from "./http_server";

export class Server {
  httpServer: HttpServer;
  constructor() {
    this.httpServer = new HttpServer();
  }

  setup = async () => {
    await store.setup();
    await this.httpServer.setup();
  };
  start = async () => {
    this.httpServer.start();
  };

  stop = async () => {
    this.httpServer.stop();
  };
}
