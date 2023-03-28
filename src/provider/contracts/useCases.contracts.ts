import { InternalServerError, ValidationError } from "@meu-pet/types";
import { IProvider, TAuthenticatedProviderInfo } from "../types";

export type TRegisterProviderDTO = Omit<IProvider, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
};

export type TRegisterProviderResult =
  | IProvider
  | ValidationError
  | InternalServerError;

export type TRegisterProviderUseCase = (
  dto: TRegisterProviderDTO
) => Promise<TRegisterProviderResult>;

export type TLoginDTO = {
  email: string;
  password: string;
};

export type TLoginResult =
  | TAuthenticatedProviderInfo
  | ValidationError
  | InternalServerError;

export type TLoginUseCase = (dto: TLoginDTO) => Promise<TLoginResult>;
