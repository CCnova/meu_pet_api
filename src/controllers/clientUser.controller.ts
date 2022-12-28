import { ClientUser } from "@prisma/client";
import { ClientUserDTOs } from "../dtos";
import { EErrorMessages, EStatusCode, TRequest, TResponse } from "../types";
import { ClientUserUseCases } from "../useCases";

export type TRegisterClientUserResponse = { user: ClientUser };

export function register(
  request: TRequest<ClientUserDTOs.TRegisterClientUserDTO>,
  response: TResponse<ClientUser>
): Promise<TResponse<TRegisterClientUserResponse>> {
  return ClientUserUseCases.register(request.body)
    .then((user) => response.status(EStatusCode.Accepted).send({ user }))
    .catch((error) => {
      console.log("AN ERROR HAS OCCURRED", error);
      return response
        .status(EStatusCode.InternalServerError)
        .send({ error: { message: EErrorMessages.InternalServerError } });
    });
}
