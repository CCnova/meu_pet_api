import { ProviderUserController } from "../controllers";
import { TRouter } from "../types";

export function setup(router: TRouter, basePath: string): TRouter {
  router.post(`${basePath}/register`, ProviderUserController.register);

  return router;
}
