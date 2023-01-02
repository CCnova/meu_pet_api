import { ClientUserController } from "../controllers";
import { TRouter } from "../types";

export function setup(router: TRouter, basePath: string): TRouter {
  router.post(`${basePath}/register`, ClientUserController.register);

  return router;
}
