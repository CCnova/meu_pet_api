import { PetRepository } from "../../pet/data";
import { ClientPrismaRepository } from "../data";
import makeLoginUseCase from "./login.useCase";
import makeRegisterClientUseCase from "./registerClient.useCase";

const registerClientUseCase = makeRegisterClientUseCase({
  clientRepo: new ClientPrismaRepository(),
  petRepo: PetRepository,
});

const loginUseCase = makeLoginUseCase(new ClientPrismaRepository());

export { registerClientUseCase, loginUseCase };
