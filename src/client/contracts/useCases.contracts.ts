import { IPet } from "@meu-pet/pet/types";
import { InternalServerError, ValidationError } from "../../types/errors.types";
import { IClient, IClientWithPets, TAuthenticatedClientInfo } from "../types";

export type TRegisterClientDTO = Omit<IClient, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
  pets: Omit<IPet, "id" | "ownerId">[];
};

export type TRegisterClientResult =
  | IClientWithPets
  | ValidationError
  | ValidationError[]
  | InternalServerError;

export type TRegisterClientUseCase = (
  dto: TRegisterClientDTO
) => Promise<TRegisterClientResult>;

export type TLoginDTO = {
  email: string;
  password: string;
};
export type TLoginResult =
  | TAuthenticatedClientInfo
  | ValidationError
  | InternalServerError;
export type TLoginUseCase = (dto: TLoginDTO) => Promise<TLoginResult>;
