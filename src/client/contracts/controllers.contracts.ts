import { IPet } from "@meu-pet/pet/types";
import { TApiController, TRequest, TResponse } from "../../types";
import { InternalServerError, ValidationError } from "../../types/errors.types";
import { IClient, IClientWithPets, TAuthenticatedClientInfo } from "../types";

export type TRegisterClientRequestBody = Omit<IClient, "id"> & {
  pets: Omit<IPet, "id" | "ownerId">[];
};
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClientWithPets;
  error?: ValidationError | InternalServerError;
};
export type TRegisterClientResponse = TResponse<TRegisterClientResponseBody>;

export type TRegisterClientController = TApiController<
  TRegisterClientRequest,
  TRegisterClientResponse
>;

export type TLoginRequestBody = {
  email: string;
  password: string;
};
export type TLoginRequest = TRequest<TLoginRequestBody>;

export type TLoginResponseBody = {
  data?: TAuthenticatedClientInfo;
  error?: ValidationError | InternalServerError;
};
export type TLoginResponse = TResponse<TLoginResponseBody>;

export type TLoginController = TApiController<TLoginRequest, TLoginResponse>;
