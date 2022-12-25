import * as express from "express";

export enum EStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,

  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInfo = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,

  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,

  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestURITooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  Teapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

type OKStatusCode =
  | EStatusCode.Continue
  | EStatusCode.SwitchingProtocols
  | EStatusCode.Processing
  | EStatusCode.EarlyHints
  | EStatusCode.OK
  | EStatusCode.Created
  | EStatusCode.Accepted
  | EStatusCode.NonAuthoritativeInfo
  | EStatusCode.NoContent
  | EStatusCode.ResetContent
  | EStatusCode.PartialContent
  | EStatusCode.MultiStatus
  | EStatusCode.AlreadyReported
  | EStatusCode.IMUsed
  | EStatusCode.MultipleChoices
  | EStatusCode.MovedPermanently
  | EStatusCode.Found
  | EStatusCode.SeeOther
  | EStatusCode.NotModified
  | EStatusCode.UseProxy
  | EStatusCode.TemporaryRedirect
  | EStatusCode.PermanentRedirect;

type ErrorStatusCode =
  | EStatusCode.BadRequest
  | EStatusCode.Unauthorized
  | EStatusCode.PaymentRequired
  | EStatusCode.Forbidden
  | EStatusCode.NotFound
  | EStatusCode.MethodNotAllowed
  | EStatusCode.NotAcceptable
  | EStatusCode.ProxyAuthRequired
  | EStatusCode.RequestTimeout
  | EStatusCode.Conflict
  | EStatusCode.Gone
  | EStatusCode.LengthRequired
  | EStatusCode.PreconditionFailed
  | EStatusCode.RequestEntityTooLarge
  | EStatusCode.RequestURITooLong
  | EStatusCode.UnsupportedMediaType
  | EStatusCode.RequestedRangeNotSatisfiable
  | EStatusCode.ExpectationFailed
  | EStatusCode.Teapot
  | EStatusCode.MisdirectedRequest
  | EStatusCode.UnprocessableEntity
  | EStatusCode.Locked
  | EStatusCode.FailedDependency
  | EStatusCode.TooEarly
  | EStatusCode.UpgradeRequired
  | EStatusCode.PreconditionRequired
  | EStatusCode.TooManyRequests
  | EStatusCode.RequestHeaderFieldsTooLarge
  | EStatusCode.UnavailableForLegalReasons
  | EStatusCode.InternalServerError
  | EStatusCode.NotImplemented
  | EStatusCode.BadGateway
  | EStatusCode.ServiceUnavailable
  | EStatusCode.GatewayTimeout
  | EStatusCode.HTTPVersionNotSupported
  | EStatusCode.VariantAlsoNegotiates
  | EStatusCode.InsufficientStorage
  | EStatusCode.LoopDetected
  | EStatusCode.NotExtended
  | EStatusCode.NetworkAuthenticationRequired;

export interface IRequestBody {
  [k: string]: any; // Matches objects
  [i: number]: any; // Matches arrays
}

export interface IRequestParams {
  [k: string]: any;
}

export interface IRequestQuery {
  [k: string]: any;
}

export interface IOKResponseBody {
  [i: number]: any;
  [k: string]: any;

  /** Errors cannot occur on OK responses */
  error?: never;
}

export interface IErrorResponseBody {
  error: string;
  error_code?: number | string;
}

export interface IRequest<
  RequestBody = IRequestBody,
  RequestParams = IRequestParams,
  RequestQuery = IRequestQuery
> extends Omit<express.Request, "body" | "params" | "query"> {
  body: RequestBody;
  params: RequestParams;
  query: RequestQuery;
}

export interface IResponse<ResponseBody = IOKResponseBody>
  extends Omit<express.Response, "status"> {
  status(code: OKStatusCode | ErrorStatusCode): this;
  send(body?: ResponseBody): this;
}
