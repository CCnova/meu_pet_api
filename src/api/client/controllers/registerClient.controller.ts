import { EStatusCode, TRequest, TResponse } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { logger } from "../../../utils";
import { IClient } from "../../types/client.types";
import { IRegisterUserUseCase } from "../contracts/useCases.contracts";

export type TRegisterClientRequestBody = Omit<IClient, "id">;
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClient;
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
  registerClient: IRegisterUserUseCase
) {
  return {
    async handle(
      request: TRegisterClientRequest,
      response: TRegisterClientResponse
    ) {
      const registerClientResult = await registerClient.execute(request.body);

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
