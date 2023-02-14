import { TApiController, TRequest, TResponse } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IClient, IClientWithPets, IPet } from "../../types";

export type TRegisterClientRequestBody = Omit<IClient, "id"> & {
  pets: Omit<IPet, "id" | "ownerId">[];
};
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClientWithPets;
  error?: ValidationError | InternalServerError;
};
export type TRegisterClientResponse = TResponse<TRegisterClientResponseBody>;

export type TRegisterClientController = TApiController<
  TRegisterClientRequest,
  TRegisterClientResponse
>;
