import { IPet } from "@meu-pet/pet/types";
import {
  EStatusCode,
  TValidationResult,
  ValidationError,
} from "@meu-pet/types";
import { assert, logger } from "@meu-pet/utils";
import { TListUserPetsUseCase } from "../contracts";
import {
  TListUserPetsController,
  TListUserPetsRequest,
  TListUserPetsRequestBody,
  TListUserPetsResponse,
} from "../contracts/controllers.contracts";

function validateRequestBody(
  body: TListUserPetsRequestBody
): TValidationResult {
  try {
    assert.isString(body.userId, "userId must be a string");

    return { isValid: true, error: null };
  } catch (validationError) {
    return { isValid: false, error: validationError as ValidationError };
  }
}

function handleValidationError(error: ValidationError) {
  logger.log.error(
    `A parameter passed to list user pets is invalid, message=${error.message}`
  );

  return {
    statusCode: error.httpStatusCode,
    body: { error },
  };
}

function handleAcceptedCase(data: IPet[]) {
  return {
    statusCode: EStatusCode.OK,
    body: { data },
  };
}

export default function makeListUserPetsController(
  listUserPets: TListUserPetsUseCase
): TListUserPetsController {
  return async function (
    request: TListUserPetsRequest
  ): Promise<TListUserPetsResponse> {
    const bodyValidationResult = validateRequestBody(request.body);

    if (!bodyValidationResult.isValid)
      return handleValidationError(bodyValidationResult.error!);

    const listUserPetsResult = await listUserPets({
      userId: request.body.userId,
    });

    return handleAcceptedCase(listUserPetsResult);
  };
}
