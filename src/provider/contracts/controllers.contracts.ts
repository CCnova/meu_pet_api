import {
  InternalServerError,
  NotFoundError,
  TApiController,
  TRequest,
  TResponse,
  ValidationError,
} from "@meu-pet/types";
import { IProvider, TAuthenticatedProviderInfo } from "../types";

export type TRegisterProviderRequestBody = {
  dateOfBirth: string;
  avatar: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TRegisterProviderResponseBody = {
  data?: IProvider;
  error?: ValidationError | InternalServerError;
};

export type TRegisterProviderRequest = TRequest<TRegisterProviderRequestBody>;
export type TRegisterProviderResponse =
  TResponse<TRegisterProviderResponseBody>;

export type TRegisterProviderController = TApiController<
  TRegisterProviderRequest,
  TRegisterProviderResponse
>;

export type TLoginRequestBody = {
  email: string;
  password: string;
};

export type TLoginResponseBody = {
  data?: TAuthenticatedProviderInfo;
  error?: ValidationError | NotFoundError | InternalServerError;
};

export type TLoginRequest = TRequest<TLoginRequestBody>;
export type TLoginResponse = TResponse<TLoginResponseBody>;

export type TLoginController = TApiController<TLoginRequest, TLoginResponse>;
