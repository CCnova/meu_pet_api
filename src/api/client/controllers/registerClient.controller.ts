import { EStatusCode, TRequest, TResponse } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IClient } from "../../types/client.types";
import { IRegisterUserUseCase } from "../contracts/useCases.contracts";

export type TRegisterClientRequestBody = Omit<IClient, "id">;
export type TRegisterClientRequest = TRequest<TRegisterClientRequestBody>;
export type TRegisterClientResponseBody = {
  data?: IClient;
  error?: ValidationError | InternalServerError;
};
export type TRegisterClientResponse = TResponse<TRegisterClientResponseBody>;

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
        return response
          .status(EStatusCode.UnprocessableEntity)
          .send({ data: null, error: registerClientResult });
      if (registerClientResult instanceof InternalServerError)
        return response
          .status(EStatusCode.InternalServerError)
          .send({ data: null, error: registerClientResult });

      return response
        .status(EStatusCode.Accepted)
        .send({ data: registerClientResult });
    },
  };
}
