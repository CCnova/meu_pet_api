import { registerProviderUseCase } from "../useCases";
import makeRegisterProviderController from "./registerProvider.controller";

const registerProviderController = makeRegisterProviderController({
  registerProvider: registerProviderUseCase,
});

export { registerProviderController };
