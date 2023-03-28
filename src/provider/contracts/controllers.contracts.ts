import {
  InternalServerError,
  TApiController,
  TRequest,
  TResponse,
  ValidationError,
} from "@meu-pet/types";
import { IProvider } from "../types";

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
