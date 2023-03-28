import { expressAdapter } from "@meu-pet/adapters";
import { TRouter } from "@meu-pet/types";
import { registerProviderController } from "./controllers";

export function setup(dependencies: { router: TRouter; basePath: string }) {
  dependencies.router.post(
    `${dependencies.basePath}/register`,
    expressAdapter.adaptController(registerProviderController)
  );
}
