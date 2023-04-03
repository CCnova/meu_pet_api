import { RequestHandler } from "express";
import { ApiError, TApiController, TApiMiddleware } from "../types";

export const toPublicError = (apiError: ApiError) => ({
  httpStatusCode: apiError.httpStatusCode,
  message: apiError.message,
});

export type TExpressControllerAdapter = (
  controller: TApiController<any, any>
) => RequestHandler;

export const adaptController: TExpressControllerAdapter =
  (controller) => async (request, response) => {
    const result = await controller(request);

    return response.status(result.statusCode).send({
      data: result.body.data,
      error: result.body.error ? toPublicError(result.body.error) : undefined,
      errors: result.body.errors?.map(toPublicError),
    });
  };

export type TExpressMiddlewareAdapter = (
  middleware: TApiMiddleware<any, any>
) => RequestHandler;

export const adaptMiddleware: TExpressMiddlewareAdapter =
  (middleware) => async (request, response, next) => {
    const result = await middleware(request);
    if (result.error)
      return response.status(result.statusCode).send({ error: result.error });
    next();
  };
