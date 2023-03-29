import { loginProviderUseCase, registerProviderUseCase } from "../useCases";
import makeLoginController from "./login.controller";
import makeRegisterProviderController from "./registerProvider.controller";

const registerProviderController = makeRegisterProviderController({
  registerProvider: registerProviderUseCase,
});

const loginProviderController = makeLoginController({
  login: loginProviderUseCase,
});

export { registerProviderController, loginProviderController };
