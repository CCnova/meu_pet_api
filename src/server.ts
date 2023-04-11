import { TApplication } from "./types";
import { logger } from "./utils";

export function start(app: TApplication, port?: string | number) {
  return app.listen(port ?? 3000, () => {
    console.log(`DB_HOST=${process.env.DB_HOST}`);
    console.log(`DB_PORT=${process.env.DB_PORT}`);
    console.log(`DB_USER=${process.env.DB_USER}`);
    console.log(`DB_PASSWORD=${process.env.DB_PASSWORD}`);
    console.log(`DB_NAME=${process.env.DB_NAME}`);
    console.log(`DB_URL=${process.env.DB_URL}`);
    logger.log.info(`Server listening on port: ${port || 3000}`);
  });
}
