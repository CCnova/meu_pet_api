import { PetPrismaRepository } from "@meu-pet/pet/data";
import { ClientPrismaRepository } from "../data";
import makeLoginUseCase from "./login.useCase";
import makeRegisterClientUseCase from "./registerClient.useCase";

const registerClientUseCase = makeRegisterClientUseCase({
  clientRepo: new ClientPrismaRepository(),
  petRepo: new PetPrismaRepository(),
});

const loginUseCase = makeLoginUseCase(new ClientPrismaRepository());

export { registerClientUseCase, loginUseCase };
