import { EErrorMessages, EStatusCode } from "../../../../types";
import { IRegisterClientService } from "../../data/contracts";
import { RegisterError } from "../../models";
import { IRegisterClientUserController } from "../contracts";
import { validateRegisterBody } from "../validations";

export const createInstance: IRegisterClientUserController.TRegisterControllerConstructor =
  (registerService: IRegisterClientService) => {
    return {
      async handle(
        request: IRegisterClientUserController.TRegisterRequest,
        response: IRegisterClientUserController.TRegisterResponse
      ): Promise<IRegisterClientUserController.TRegisterResponse> {
        validateRegisterBody(request.body);
        const result = await registerService.execute(request.body);
        if (result instanceof RegisterError) {
          // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
          return response
            .status(EStatusCode.InternalServerError)
            .send({ error: { message: EErrorMessages.InternalServerError } });
        }

        return response.status(EStatusCode.Accepted).send({ user: result });
      },
    };
  };
