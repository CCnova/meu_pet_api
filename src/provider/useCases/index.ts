import { ProviderPrismaRepository } from "../data";
import makeRegisterProviderUseCase from "./registerProvider.useCase";

const registerClientUseCase = makeRegisterProviderUseCase({
  providerRepo: new ProviderPrismaRepository(),
});

export { registerClientUseCase };
