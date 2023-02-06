import { PetRepository } from "../../pet/data";
import { ClientRepository } from "../data";
import makeRegisterClientUseCase from "./registerClient.useCase";

const registerClient = makeRegisterClientUseCase({
  clientRepo: ClientRepository,
  petRepo: PetRepository,
});

export { registerClient };
