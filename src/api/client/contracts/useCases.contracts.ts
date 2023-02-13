import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IPet } from "../../types";
import {
  IClient,
  IClientWithPets,
  TAuthenticatedClientInfo,
} from "../../types/client.types";

export type TRegisterClientDTO = Omit<IClient, "id"> & {
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

export type TAuthenticateClientDTO = {
  email: string;
  password: string;
};
export type TAuthenticateClientResult =
  | TAuthenticatedClientInfo
  | ValidationError
  | InternalServerError;
export type TAuthenticateClientUseCase = (
  dto: TAuthenticateClientDTO
) => Promise<TAuthenticateClientResult>;
