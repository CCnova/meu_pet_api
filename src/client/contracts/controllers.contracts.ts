import { IPet } from "@meu-pet/pet/types";
import {
  InternalServerError,
  NotFoundError,
  TApiController,
  TRequest,
  TResponse,
  ValidationError,
} from "@meu-pet/types";
import { IClient, IClientWithPets, TAuthenticatedClientInfo } from "../types";

export type TRegisterClientRequestBody = Omit<IClient, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
  pets: Array<
    Omit<IPet, "id" | "ownerId" | "dateOfBirth"> & { dateOfBirth: string }
  >;
};
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClientWithPets;
  error?: ValidationError | InternalServerError;
  errors?: ValidationError[];
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
  error?: ValidationError | InternalServerError | NotFoundError;
};
export type TLoginResponse = TResponse<TLoginResponseBody>;

export type TLoginController = TApiController<TLoginRequest, TLoginResponse>;

export type TListUserPetsRequest = TRequest;

export type TListUserPetsResponseBody = {
  data?: IPet[];
  error?: ValidationError | InternalServerError;
};

export type TListUserPetsResponse = TResponse<TListUserPetsResponseBody>;

export type TListUserPetsController = TApiController<
  TListUserPetsRequest,
  TListUserPetsResponse
>;
