import { EErrorMessages, EStatusCode } from "../../../../types";
import { IAuthenticateClientService } from "../../data/contracts";
import { AuthenticationError } from "../../models";
import { IAuthenticateClientUserController } from "../contracts";
import { validateAuthenticateBody } from "../validations";

export const createInstance: IAuthenticateClientUserController.TAuthenticateControllerConstructor =
  (authService: IAuthenticateClientService) => {
    return {
      async handle(request, response) {
        validateAuthenticateBody(request.body);
        const result = await authService.execute(request.body);

        if (result instanceof AuthenticationError) {
          console.log(
            `[clients.controller.authenticate] An error has occurred trying to authenticate email=${request.body.email}`
          );
          // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
          return response
            .status(EStatusCode.InternalServerError)
            .send({ error: { message: EErrorMessages.InternalServerError } });
        }

        return response.status(EStatusCode.Accepted).send({ user: result });
      },
    };
  };
