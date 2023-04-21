import { ErrorHandler } from "@meu-pet/handlers";
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
      return ErrorHandler.handleError(
        bodyValidationResult.error as ValidationError,
        `A parameter passed to login provider is invalid`
      );

    const loginResult = await dependencies.login(request.body);

    if (loginResult instanceof ValidationError)
      return ErrorHandler.handleError(
        loginResult,
        `Wrong password passed to login provider`
      );
    if (loginResult instanceof NotFoundError)
      return ErrorHandler.handleError(loginResult, `Provider email is invalid`);
    if (loginResult instanceof InternalServerError)
      return ErrorHandler.handleError(
        loginResult,
        `Something went wrong while trying to login provider`
      );

    return handleAcceptedCase(loginResult);
  };
}
