import { EStatusCode, TRequest, TResponse } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { logger } from "../../../utils";
import { IPet } from "../../types";
import { IClient } from "../../types/client.types";
import { TRegisterClientUseCase } from "../contracts";

export type TRegisterClientRequestBody = Omit<IClient, "id"> & {
  pets: Omit<IPet, "id" | "ownerId">[];
};
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClient & { pets: IPet };
  error?: ValidationError | InternalServerError;
};
export type TRegisterClientResponse = TResponse<TRegisterClientResponseBody>;

function handleValidationError(
  error: ValidationError,
  response: TRegisterClientResponse
) {
  logger.log.error(
    `A parameter passed to register client user is invalid, message=${error.message}`
  );
  return response
    .status(EStatusCode.UnprocessableEntity)
    .send({ data: null, error });
}

function handleInternalServerError(
  error: InternalServerError,
  response: TRegisterClientResponse
) {
  logger.log.error(
    `A unknown error has occurred while trying to create a new client, message=${error.message}`
  );
  return response
    .status(EStatusCode.InternalServerError)
    .send({ data: null, error });
}

export default function makeRegisterClientController(
  registerClient: TRegisterClientUseCase
) {
  return {
    async handle(
      request: TRegisterClientRequest,
      response: TRegisterClientResponse
    ) {
      const registerClientResult = await registerClient(request.body);

      if (registerClientResult instanceof ValidationError)
        return handleValidationError(registerClientResult, response);
      if (registerClientResult instanceof InternalServerError)
        return handleInternalServerError(registerClientResult, response);
      return response
        .status(EStatusCode.Accepted)
        .send({ data: registerClientResult });
    },
  };
}
