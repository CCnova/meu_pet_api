import { ClientUserController } from "../controllers";
import { TRouter } from "../types";

export function setup(router: TRouter): TRouter {
  router.post("/register", ClientUserController.register);

  return router;
}
