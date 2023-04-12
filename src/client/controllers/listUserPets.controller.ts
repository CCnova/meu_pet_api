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
  TListUserPetsResponse,
} from "../contracts/controllers.contracts";

function validateRequest(request: TListUserPetsRequest): TValidationResult {
  try {
    assert.isDefined(
      request.user,
      "something went wrong while reading the auth token"
    );

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
    const requestValidationResult = validateRequest(request);

    if (!requestValidationResult.isValid)
      return handleValidationError(requestValidationResult.error!);

    const listUserPetsResult = await listUserPets({
      userId: request.user!.id,
    });

    return handleAcceptedCase(listUserPetsResult);
  };
}
