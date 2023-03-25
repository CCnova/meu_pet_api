import { RequestHandler } from "express";
import { TApiController } from "../types";

export type TExpressRouteAdapter = (
  controller: TApiController<any, any>
) => RequestHandler;

export const adaptRoute: TExpressRouteAdapter =
  (controller) => async (request, response) => {
    const result = await controller({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    response.status(result.statusCode)
    if (result.body.error)
      return response.send({ error: result.body.error.message });
    else
      return response.send(result.body)
  };
