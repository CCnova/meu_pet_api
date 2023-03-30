import { RequestHandler } from "express";
import { ApiError, TApiController } from "../types";

export const toPublicError = (apiError: ApiError) => ({
  httpStatusCode: apiError.httpStatusCode,
  message: apiError.message,
});

export type TExpressControllerAdapter = (
  controller: TApiController<any, any>
) => RequestHandler;

export const adaptController: TExpressControllerAdapter =
  (controller) => async (request, response) => {
    const result = await controller({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    return response.status(result.statusCode).send({
      data: result.body.data,
      error: result.body.error ? toPublicError(result.body.error) : undefined,
      errors: result.body.errors?.map(toPublicError),
    });
  };
