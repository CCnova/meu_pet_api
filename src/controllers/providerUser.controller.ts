import { ProviderUserDTOs } from "../dtos";
import { EErrorMessages, EStatusCode, TRequest, TResponse } from "../types";
import { ProviderUserUseCases } from "../useCases";

export type TRegisterProviderUserRequest =
  ProviderUserDTOs.TRegisterProviderUserDTO;
export type TRegisterProviderUserResponse = {
  user: ProviderUserDTOs.TRegisterProviderUserDTO & { id: number };
};

export function register(
  request: TRequest<TRegisterProviderUserRequest>,
  response: TResponse<TRegisterProviderUserResponse>
): Promise<TResponse> {
  // Todo(CCnova): Never passs the request body directly and without validation to use case domain
  return ProviderUserUseCases.register(request.body)
    .then((user) => response.status(EStatusCode.Accepted).send({ user }))
    .catch((error) => {
      console.log("AN ERROR HAS OCCURRED", error);
      // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
      return response
        .status(EStatusCode.InternalServerError)
        .send({ error: { message: EErrorMessages.InternalServerError } });
    });
}
