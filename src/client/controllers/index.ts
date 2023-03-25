import { loginUseCase, registerClientUseCase } from "../useCases";
import makeLoginController from "./login.controller";
import makeRegisterClientController from "./registerClient.controller";

const registerClientController = makeRegisterClientController(
  registerClientUseCase
);
const loginController = makeLoginController(loginUseCase);

export { registerClientController, loginController };
