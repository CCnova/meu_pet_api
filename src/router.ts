import { ClientsRouter } from "./api/clients";
import { TRouter } from "./types";

const BASE_PATH = "/v1";

export function setup(router: TRouter) {
  ClientsRouter.setup(router, `${BASE_PATH}/client-user`);

  return router;
}
