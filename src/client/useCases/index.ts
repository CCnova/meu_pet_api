import { PetRepository } from "../../pet/data";
import { ClientPrismaRepository } from "../data";
import makeRegisterClientUseCase from "./registerClient.useCase";

const registerClient = makeRegisterClientUseCase({
  clientRepo: new ClientPrismaRepository(),
  petRepo: PetRepository,
});

export { registerClient };
