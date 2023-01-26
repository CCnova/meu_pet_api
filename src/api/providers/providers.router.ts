import { TRouter } from "../../types";
import * as ProvidersController from "./providers.controller";

export function setup(router: TRouter, basePath: string): TRouter {
  router.post(`${basePath}/register`, ProvidersController.register);

  return router;
}
