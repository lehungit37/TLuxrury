import logger from "./clog";
import { Root } from "./root";

async function main() {
  const root = new Root();

  const shutdown = (reason?: Error) => root.shutdown(reason);

  try {
    await root.setup();
    await root.start();
  } catch (error: any) {
    logger.error({ errorMain: error });
    shutdown(error);
  }
}

main();
