import {
  EStatusCode,
  InternalServerError,
  NotFoundError,
  TValidationResult,
  ValidationError,
} from "@meu-pet/types";
import { assert, logger } from "@meu-pet/utils";
import { TLoginUseCase } from "../contracts";
import {
  TLoginController,
  TLoginRequest,
  TLoginRequestBody,
  TLoginResponse,
} from "../contracts/controllers.contracts";
import { TAuthenticatedProviderInfo } from "../types";

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
    `A parameter passed to Provider login is invalid, message=${error.message}`
  );

  return {
    statusCode: error.httpStatusCode,
    body: {
      error: {
        ...error,
        message: "Email or Password invalid",
      } as ValidationError,
    },
  };
}

function handleNotFoundError(error: NotFoundError) {
  logger.log.error(
    `A parameter passed to Provider login is invalid, message=${error.message}`
  );

  return {
    statusCode: error.httpStatusCode,
    body: { error: { ...error, message: "Email or Password invalid" } },
  };
}

function handleInternalServerError(error: InternalServerError) {
  logger.log.error(
    `A unknown error has occurred while trying to login, message=${error.message}`
  );

  return {
    statusCode: error.httpStatusCode,
    body: {
      error: {
        ...error,
        message: "A unknown error has occurred while trying to login",
      },
    },
  };
}

function handleAcceptedCase(data: TAuthenticatedProviderInfo) {
  return {
    statusCode: EStatusCode.OK,
    body: { data },
  };
}

export default function makeLoginController(dependencies: {
  login: TLoginUseCase;
}): TLoginController {
  return async function (request: TLoginRequest): Promise<TLoginResponse> {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      return handleValidationError(
        bodyValidationResult.error as ValidationError
      );

    const loginResult = await dependencies.login(request.body);

    if (loginResult instanceof ValidationError)
      return handleValidationError(loginResult);
    if (loginResult instanceof NotFoundError)
      return handleNotFoundError(loginResult);
    if (loginResult instanceof InternalServerError)
      return handleInternalServerError(loginResult);

    return handleAcceptedCase(loginResult);
  };
}
