import { ClientUserDTOs } from "../dtos";
import { EErrorMessages, EStatusCode, TRequest, TResponse } from "../types";
import { ClientUserUseCases } from "../useCases";

export type TRegisterClientUserRequest = ClientUserDTOs.TRegisterClientUserDTO;
export type TRegisterClientUserResponse = {
  user: ClientUserDTOs.TRegisterClientUserDTO & { id: number };
};

export function register(
  request: TRequest<TRegisterClientUserRequest>,
  response: TResponse<TRegisterClientUserResponse>
): Promise<TResponse<TRegisterClientUserResponse>> {
  // Todo(CCnova): Never passs the request body directly and without validation to use case domain
  return ClientUserUseCases.register(request.body)
    .then((user) => response.status(EStatusCode.Accepted).send({ user }))
    .catch((error) => {
      console.log("AN ERROR HAS OCCURRED", error);
      // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
      return response
        .status(EStatusCode.InternalServerError)
        .send({ error: { message: EErrorMessages.InternalServerError } });
    });
}