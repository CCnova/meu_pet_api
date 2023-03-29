import { RequestHandler } from "express";
import { TApiController } from "../types";

export type TExpressRouteAdapter = (
  controller: TApiController<any, any>
) => RequestHandler;

export const adaptController: TExpressRouteAdapter =
  (controller) => async (request, response) => {
    const result = await controller({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    return response
      .status(result.statusCode)
      .send({
        data: result.body.data,
        error: result.body.error,
        errors: result.body.errors,
      });
  };
