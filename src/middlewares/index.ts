import { authenticationUtils } from "@meu-pet/utils";
import { createVerifyAuthenticationTokenMiddleWare } from "./authentication.middleware";

const authenticationMiddlewares = {
  verifyAuthenticationToken: createVerifyAuthenticationTokenMiddleWare({
    tokenVerificatorFn: authenticationUtils.verifyJwtToken,
  }),
};

export { authenticationMiddlewares };
