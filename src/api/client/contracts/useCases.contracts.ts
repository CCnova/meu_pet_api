import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IPet } from "../../types";
import { IClient } from "../../types/client.types";

export type TRegisterClientUserDTO = Omit<IClient, "id"> & {
  pets: Omit<IPet, "id">[];
};

export interface IRegisterUserUseCase {
  execute: (
    dto: TRegisterClientUserDTO
  ) => Promise<
    IClient | ValidationError | ValidationError[] | InternalServerError
  >;
}
