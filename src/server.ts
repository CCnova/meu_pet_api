import { TApplication } from "./types";
import { logger } from "./utils";

export function start(app: TApplication, port?: string | number) {
  return app.listen(port ?? 3000, () => {
    logger.log.info(`Server listening on port: ${port || 3000}`);
  });
}
