import { TRouter } from "../../types";
import { expressAdapter } from "../adapters";
import { registerClientController } from "./controllers";

export function setup({
  router,
  basePath,
}: {
  router: TRouter;
  basePath: string;
}) {
  router.post(
    `${basePath}/register`,
    expressAdapter.adaptRoute(registerClientController)
  );
}
