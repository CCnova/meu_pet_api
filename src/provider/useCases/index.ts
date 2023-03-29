import { authenticationUtils, compare } from "@meu-pet/utils";
import { ProviderPrismaRepository } from "../data";
import makeLoginUseCase from "./login.useCase";
import makeRegisterProviderUseCase from "./registerProvider.useCase";

const registerProviderUseCase = makeRegisterProviderUseCase({
  providerRepo: new ProviderPrismaRepository(),
});

const loginProviderUseCase = makeLoginUseCase({
  providerRepository: new ProviderPrismaRepository(),
  authenticationTokenGeneratorFn: authenticationUtils.generateJwtToken,
  encryptionCompareFn: compare,
});

export { registerProviderUseCase, loginProviderUseCase };
