import { ClientUserRouter, ProviderUserRouter } from ".";
import { TRouter } from "../types";

const BASE_PATH = "/v1";

export function setup(router: TRouter) {
  ClientUserRouter.setup(router, `${BASE_PATH}/client-user`);
  ProviderUserRouter.setup(router, `${BASE_PATH}/provider-user`);

  return router;
}
