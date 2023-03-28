import { ProviderPrismaRepository } from "../data";
import makeRegisterProviderUseCase from "./registerProvider.useCase";

const registerProviderUseCase = makeRegisterProviderUseCase({
  providerRepo: new ProviderPrismaRepository(),
});

export { registerProviderUseCase };
