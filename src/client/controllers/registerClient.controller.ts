import { TRegisterClientUseCase } from "@meu-pet/client/contracts";
import {
  EStatusCode,
  InternalServerError,
  TValidationResult,
  ValidationError,
} from "@meu-pet/types";
import { assert, logger } from "@meu-pet/utils";
import {
  TRegisterClientController,
  TRegisterClientRequest,
  TRegisterClientRequestBody,
  TRegisterClientResponse,
} from "../contracts/controllers.contracts";
import { IClientWithPets } from "../types";

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

    if (body.avatar) assert.isString(body.avatar, "avatar must be a string");

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
function handleAcceptedCase(data: IClientWithPets) {
  return {
    statusCode: EStatusCode.Created,
    body: { data },
  };
}

export default function makeRegisterClientController(
  registerClient: TRegisterClientUseCase
): TRegisterClientController {
  return async function (
    request: TRegisterClientRequest
  ): Promise<TRegisterClientResponse> {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      return handleValidationError(
        bodyValidationResult.error as ValidationError
      );

    const registerClientResult = await registerClient(request.body);

    if (registerClientResult instanceof ValidationError)
      return handleValidationError(registerClientResult);
    if (registerClientResult instanceof InternalServerError)
      return handleInternalServerError(registerClientResult);

    // Todo(CCnova): Handle ValidationError[] case
    return handleAcceptedCase(registerClientResult as IClientWithPets);
  };
}
