import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IClient } from "../../types/client.types";

export type TRegisterClientUserDTO = Omit<IClient, "id">;

export interface IRegisterUserUseCase {
  execute: (
    dto: TRegisterClientUserDTO
  ) => Promise<IClient | ValidationError | InternalServerError>;
}
