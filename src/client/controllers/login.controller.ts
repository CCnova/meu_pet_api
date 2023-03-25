import { EStatusCode } from "../../types";
import { InternalServerError, ValidationError } from "../../types/errors.types";
import { TValidationResult } from "../../types/validations.types";
import { assert, logger } from "../../utils";
import { TLoginUseCase } from "../contracts";
import {
  TLoginController,
  TLoginRequest,
  TLoginRequestBody,
} from "../contracts/controllers.contracts";

function validateRequestBody(body: TLoginRequestBody): TValidationResult {
  try {
    assert.isString(body.email, "email must be a string");
    assert.isString(body.password, "password must be a string");

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
    `A unknown error has occurred while trying to login, message=${error.message}`
  );

  return {
    statusCode: EStatusCode.InternalServerError,
    body: { error },
  };
}

export default function makeLoginController(
  login: TLoginUseCase
): TLoginController {
  return async (request: TLoginRequest) => {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      return handleValidationError(
        bodyValidationResult.error as ValidationError
      );

    const loginResult = await login(request.body);

    if (loginResult instanceof ValidationError)
      return handleValidationError(loginResult);
    if (loginResult instanceof InternalServerError)
      return handleInternalServerError(loginResult);

    return {
      statusCode: EStatusCode.OK,
      body: { data: loginResult },
    };
  };
}
