import { EStatusCode } from "./api.types";
import { Maybe } from "./util.types";

export class ApiError extends Error {
  code?: string | number;

  httpStatusCode: number = EStatusCode.BadRequest;

  constructor(message: string, httpStatusCode?: Maybe<number>) {
    super(message);
    if (httpStatusCode) {
      this.httpStatusCode = httpStatusCode;
    }
  }
}

export class ValidationError extends ApiError {
  httpStatusCode = EStatusCode.UnprocessableEntity;

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends ApiError {
  httpStatusCode = EStatusCode.InternalServerError;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  httpStatusCode = EStatusCode.NotFound;

  constructor(message: string) {
    super(message);
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
