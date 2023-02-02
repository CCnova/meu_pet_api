import { RegisterClientUseCase } from "../useCases";
import makeRegisterClientController from "./registerClient.controller";

const RegisterClientController = makeRegisterClientController(
  RegisterClientUseCase
);

export { RegisterClientController };
