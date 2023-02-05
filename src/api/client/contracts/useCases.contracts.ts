import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IPet } from "../../types";
import { IClient, IClientWithPets } from "../../types/client.types";

export type TRegisterClientUserDTO = Omit<IClient, "id"> & {
  pets: Omit<IPet, "id" | "ownerId">[];
};

export interface IRegisterUserUseCase {
  execute: (
    dto: TRegisterClientUserDTO
  ) => Promise<
    IClientWithPets | ValidationError | ValidationError[] | InternalServerError
  >;
}
