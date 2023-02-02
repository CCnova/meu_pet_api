import { ClientRepository } from "../data";
import makeRegisterClientUserCase from "./registerClient.useCase";

const RegisterClientUseCase = makeRegisterClientUserCase(ClientRepository);

export { RegisterClientUseCase };
