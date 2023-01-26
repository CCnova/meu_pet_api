import { TRouter } from "../../types";
import * as ClientsController from "./clients.controller";

export function setup(router: TRouter, basePath: string): TRouter {
  router.post(`${basePath}/register`, ClientsController.register);
  router.post(`${basePath}/auth`, ClientsController.authenticate);

  return router;
}
