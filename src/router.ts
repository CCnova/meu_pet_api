import { ClientsRouter } from "./api/clients";
import { ProvidersRouter } from "./api/providers";
import { TRouter } from "./types";

const BASE_PATH = "/v1";

export function setup(router: TRouter) {
  ClientsRouter.setup(router, `${BASE_PATH}/client-user`);
  ProvidersRouter.setup(router, `${BASE_PATH}/provider-user`);

  return router;
}
