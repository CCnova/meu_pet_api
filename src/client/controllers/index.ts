import {
  listUserPetsUseCase,
  loginUseCase,
  registerClientUseCase,
} from "../useCases";
import makeListUserPetsController from "./listUserPets.controller";
import makeLoginController from "./login.controller";
import makeRegisterClientController from "./registerClient.controller";

const registerClientController = makeRegisterClientController(
  registerClientUseCase
);
const loginController = makeLoginController(loginUseCase);
const listUserPetsController = makeListUserPetsController(listUserPetsUseCase);

export { registerClientController, loginController, listUserPetsController };
