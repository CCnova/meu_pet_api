import { PetRepository } from "../../pet/data";
import { ClientRepository } from "../data";
import makeRegisterClientUserCase from "./registerClient.useCase";

const RegisterClientUseCase = makeRegisterClientUserCase({
  clientRepo: ClientRepository,
  petRepo: PetRepository,
});

export { RegisterClientUseCase };
