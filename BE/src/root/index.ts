import { Server } from "../server";

export class Root {
  server: Server;
  constructor() {
    this.server = new Server();
  }

  setup = async () => {
    await this.server.setup();
  };

  start = async () => {
    try {
      await this.server.start();
    } catch (error: any) {
      await this.shutdown(error);
    }
  };

  shutdown = async (reason?: Error) => {
    await this.server.stop();
  };
}
