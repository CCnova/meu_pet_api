import { expressAdapter } from "../adapters";
import { TRouter } from "../types";
import {
  listUserPetsController,
  loginController,
  registerClientController,
} from "./controllers";

export function setup({
  router,
  basePath,
}: {
  router: TRouter;
  basePath: string;
}) {
  router.post(
    `${basePath}/register`,
    expressAdapter.adaptController(registerClientController)
  );

  router.post(
    `${basePath}/login`,
    expressAdapter.adaptController(loginController)
  );

  router.get(
    `${basePath}/pets`,
    expressAdapter.adaptController(listUserPetsController)
  );
}
