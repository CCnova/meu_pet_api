import { EStatusCode } from "./api.types";
import { Maybe } from "./util.types";

export class ApiError extends Error {
  code?: string | number;

  httpStatusCode: number = EStatusCode.BadRequest;

  constructor(
    message: string,
    code?: string | number,
    httpStatusCode?: Maybe<number>
  ) {
    super(message);
    this.code = code;
    if (httpStatusCode) {
      this.httpStatusCode = httpStatusCode;
    }
  }
}

export class ValidationError extends ApiError {
  httpStatusCode = EStatusCode.UnprocessableEntity;
}

export class InternalServerError extends ApiError {
  httpStatusCode = EStatusCode.InternalServerError;
}

export class NotFoundError extends ApiError {
  httpStatusCode = EStatusCode.NotFound;
}
