import { ErrorHandler } from "@meu-pet/handlers";
import { EStatusCode } from "../../types";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../../types/errors.types";
import { TValidationResult } from "../../types/validations.types";
import { assert } from "../../utils";
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

export default function makeLoginController(
  login: TLoginUseCase
): TLoginController {
  return async function (request: TLoginRequest) {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      return ErrorHandler.handleError(
        bodyValidationResult.error as ValidationError
      );

    const loginResult = await login(request.body);

    if (loginResult instanceof ValidationError)
      return ErrorHandler.handleError(
        { ...loginResult, message: "Email or Password invalid" },
        `A parameter passed to Client login is invalid`
      );
    if (loginResult instanceof NotFoundError)
      return ErrorHandler.handleError(
        { ...loginResult, message: "Email or Password invalid" },
        `A parameter passed to Client login is invalid`
      );
    if (loginResult instanceof InternalServerError)
      return ErrorHandler.handleError({
        ...loginResult,
        message: "An unknown error has ocurred while trying to login",
      });

    return {
      statusCode: EStatusCode.OK,
      body: { data: loginResult },
    };
  };
}
