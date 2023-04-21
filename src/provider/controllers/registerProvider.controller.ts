import { ErrorHandler } from "@meu-pet/handlers";
import {
  EStatusCode,
  InternalServerError,
  TValidationResult,
  ValidationError,
} from "@meu-pet/types";
import { assert, logger } from "@meu-pet/utils";
import { TRegisterProviderUseCase } from "../contracts";
import {
  TRegisterProviderController,
  TRegisterProviderRequestBody,
} from "../contracts/controllers.contracts";
import { IProvider } from "../types";

function validateRequestBody(
  body: TRegisterProviderRequestBody
): TValidationResult {
  try {
    assert.isDate(body.dateOfBirth, "dateOfBirth must be a date");
    assert.isString(body.email, "email must be a string");
    assert.isString(body.firstName, "firstName must be a string");
    assert.isString(body.lastName, "lastName must be a string");
    assert.isString(body.password, "password must be a string");

    if (body.avatar) assert.isString(body.avatar, "avatar must be a string");

    return { isValid: true, error: null };
  } catch (validationError) {
    return { isValid: false, error: validationError as ValidationError };
  }
}

function handleValidationError(error: ValidationError) {
  logger.log.error(
    `A parameter passed to register provider user is invalid, message=${error.message}`
  );

  return {
    statusCode: error.httpStatusCode,
    body: { error },
  };
}

// TODO(CCnova): Is this function necessary?
function handleInternalServerError(error: InternalServerError) {
  return {
    statusCode: error.httpStatusCode,
    body: { error },
  };
}

// TODO(CCnova): Is this function necessary?
function handleAcceptedCase(data: IProvider) {
  return {
    statusCode: EStatusCode.Created,
    body: { data },
  };
}

export default function makeRegisterProviderController(dependencies: {
  registerProvider: TRegisterProviderUseCase;
}): TRegisterProviderController {
  return async function (request) {
    // Todo(CCnova): Implement unit test for this validation
    const bodyValidation = validateRequestBody(request.body);

    if (!bodyValidation.isValid)
      return ErrorHandler.handleError(
        bodyValidation.error as ValidationError,
        `A parameter passed to register provider is invalid`
      );

    const registerProviderResult = await dependencies.registerProvider(
      request.body
    );

    if (registerProviderResult instanceof ValidationError)
      return ErrorHandler.handleError(
        registerProviderResult,
        `A parameter passed to register provider is invalid`
      );
    if (registerProviderResult instanceof InternalServerError)
      return ErrorHandler.handleError(
        registerProviderResult,
        `Something went wrong while trying to register a provider`
      );

    return handleAcceptedCase(registerProviderResult);
  };
}
