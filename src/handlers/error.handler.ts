import {
  ApiError,
  EStatusCode,
  InternalServerError,
  NotFoundError,
  TResponse,
  ValidationError,
} from "@meu-pet/types";
import { logger } from "@meu-pet/utils";

function getErrorTypeString(error: ApiError): string {
  if (error instanceof ValidationError) return "Validation Error";
  if (error instanceof InternalServerError) return "Internal Server Error";
  if (error instanceof NotFoundError) return "Not Found Error";

  return "Unknown Error";
}

export function handleError(
  error: ApiError,
  loggerMessage?: string
): TResponse<{ error: ApiError }> {
  if (loggerMessage) logger.log.error(loggerMessage);

  const errorType = getErrorTypeString(error);

  logger.log.error(`A ${errorType} has occurred, message=${error.message}`);

  return {
    statusCode: error.httpStatusCode,
    body: { error },
  };
}

export function handleErrors(
  errors: ApiError[],
  statusCode: EStatusCode,
  loggerMessage?: string
): TResponse<{ errors: ApiError[] }> {
  if (loggerMessage) logger.log.error(loggerMessage);

  errors.forEach((error) => handleError(error));

  return {
    statusCode,
    body: { errors },
  };
}
