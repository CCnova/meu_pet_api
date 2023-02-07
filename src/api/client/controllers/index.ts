import { registerClient } from "../useCases";
import makeRegisterClientController from "./registerClient.controller";

const registerClientController = makeRegisterClientController(registerClient);

export { registerClientController };
