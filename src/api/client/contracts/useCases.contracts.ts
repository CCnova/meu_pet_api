import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IPet } from "../../types";
import { IClient, IClientWithPets } from "../../types/client.types";

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
