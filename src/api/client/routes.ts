import { TRouter } from "../../types";
import { RegisterClientController } from "./controllers";

export function setup(router: TRouter, basePath: string) {
  router.post(`${basePath}/register`, RegisterClientController.handle);
}
