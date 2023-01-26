import { ClientUser } from "@prisma/client";
import { EErrorMessages, EStatusCode, TRequest, TResponse } from "../../types";
import * as ClientsService from "./clients.service";
import { TRegisterClientUserDTO } from "./clients.types";
import * as ClientsValidations from "./clients.validations";

export type TRegisterClientUserRequest = TRegisterClientUserDTO;

export type TRegisterClientUserResponse = {
  user: TRegisterClientUserDTO & { id: number };
};

export async function register(
  request: TRequest<TRegisterClientUserRequest>,
  response: TResponse<TRegisterClientUserResponse>
): Promise<TResponse<TRegisterClientUserResponse>> {
  try {
    ClientsValidations.validateRegisterBody(request.body);
    const user = await ClientsService.register(request.body);
    return response.status(EStatusCode.Accepted).send({ user });
  } catch (error) {
    console.log("AN ERROR HAS OCCURRED", error);
    // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
    return response
      .status(EStatusCode.InternalServerError)
      .send({ error: { message: EErrorMessages.InternalServerError } });
  }
}

export type TAuthenticateClientUserRequest = {
  email: string;
  password: string;
};
export type TAuthenticateClientUserResponse = { user: ClientUser };

export async function authenticate(
  request: TRequest<TAuthenticateClientUserRequest>,
  response: TResponse<TAuthenticateClientUserResponse>
): Promise<TResponse<TAuthenticateClientUserResponse>> {
  try {
    ClientsValidations.validateAuthenticateBody(request.body);
    const user = await ClientsService.authenticate(request.body);

    return response.status(EStatusCode.Accepted).send({ user });
  } catch (error) {
    console.log(
      `[clients.controller.authenticate] An error has occurred trying to authenticate email=${request.body.email}`
    );
    // Todo(CCnova): Need to differentiate the different possible errors instead of only returning Internal server error
    return response
      .status(EStatusCode.InternalServerError)
      .send({ error: { message: EErrorMessages.InternalServerError } });
  }
}
