import { EStatusCode } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { TValidationResult } from "../../../types/validations.types";
import { assert, logger } from "../../../utils";
import { IClientWithPets } from "../../types";
import { TRegisterClientUseCase } from "../contracts";
import {
  TRegisterClientController,
  TRegisterClientRequest,
  TRegisterClientRequestBody,
  TRegisterClientResponse,
} from "../contracts/controllers.contracts";

function validateRequestBody(
  body: TRegisterClientRequestBody
): TValidationResult {
  try {
    assert.isString(body.address, "address must be a string");
    assert.isString(body.cpf, "cpf must be a string");
    assert.isDate(body.dateOfBirth, "dateOfBirth must be a Date");
    assert.isString(body.email, "email must be a string");
    assert.isString(body.firstName, "firstName must be a string");
    assert.isString(body.lastName, "lastName must be a string");
    assert.isString(body.password, "password must be a string");
    assert.isString(body.type, "type must be a string");

    if (body.avatar) assert.isString(body.avatar, "");

    return { isValid: true, error: null };
  } catch (validationError) {
    return { isValid: false, error: validationError as ValidationError };
  }
}

function handleValidationError(error: ValidationError) {
  logger.log.error(
    `A parameter passed to register client user is invalid, message=${error.message}`
  );

  return {
    statusCode: EStatusCode.UnprocessableEntity,
    body: { error },
  };
}

function handleInternalServerError(error: InternalServerError) {
  logger.log.error(
    `A unknown error has occurred while trying to create a new client, message=${error.message}`
  );

  return {
    statusCode: EStatusCode.InternalServerError,
    body: { error },
  };
}

export default function makeRegisterClientController(
  registerClient: TRegisterClientUseCase
): TRegisterClientController {
  return async (
    request: TRegisterClientRequest
  ): Promise<TRegisterClientResponse> => {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      handleValidationError(bodyValidationResult.error as ValidationError);

    const registerClientResult = await registerClient(request.body);

    if (registerClientResult instanceof ValidationError)
      return handleValidationError(registerClientResult);
    if (registerClientResult instanceof InternalServerError)
      return handleInternalServerError(registerClientResult);
    return {
      statusCode: EStatusCode.Accepted,
      body: { data: registerClientResult as IClientWithPets },
    };
  };
}
