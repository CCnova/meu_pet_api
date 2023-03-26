import { InternalServerError, ValidationError } from "@meu-pet/types";
import { IProvider } from "../types";

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
