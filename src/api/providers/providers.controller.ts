import {
  EErrorMessages,
  EStatusCode,
  Maybe,
  TRequest,
  TResponse,
} from "../../types";
import * as ProvidersService from "./providers.service";
import { TRegisterProviderUserDTO } from "./providers.types";

export type TRegisterProviderUserRequest = TRegisterProviderUserDTO;

export type TRegisterProviderUserResponse = {
  user: Maybe<TRegisterProviderUserDTO & { id: number }>;
};

export function register(
  request: TRequest<TRegisterProviderUserRequest>,
  response: TResponse<TRegisterProviderUserResponse>
): Promise<TResponse> {
  // Todo(CCnova): Never passs the request body directly and without validation to use case domain
  return ProvidersService.register(request.body)
    .then((user) => response.status(EStatusCode.Accepted).send({ user }))
    .catch((error) => {
      // Todo(CCnova): Implement a global logger to avoid using the native console in the app
      console.log("AN ERROR HAS OCCURRED", error);

      // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
      return response
        .status(EStatusCode.InternalServerError)
        .send({ error: { message: EErrorMessages.InternalServerError } });
    });
}
