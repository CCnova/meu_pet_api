import { EStatusCode, TApiMiddleware, TRequest } from "@meu-pet/types";
import { TAuthTokenVerificator } from "@meu-pet/utils/authentication.utils";

export type TVerifyAuthenticationTokenMiddleware = TApiMiddleware<
  any,
  { statusCode: EStatusCode; error?: string }
>;

export type TVerifyAuthenticationTokenDependencies = {
  tokenVerificatorFn: TAuthTokenVerificator;
};
export function createVerifyAuthenticationTokenMiddleWare(
  dependencies: TVerifyAuthenticationTokenDependencies
): TVerifyAuthenticationTokenMiddleware {
  return async function (request: TRequest<any>) {
    const token = request.headers?.token;
    if (!token)
      return {
        statusCode: EStatusCode.Unauthorized,
        error: "Request token is missing",
      };

    try {
      const tokenData = dependencies.tokenVerificatorFn(token);

      const requestUser = {
        id: tokenData.payload.id,
        email: tokenData.payload.email,
        type: tokenData.payload.type,
      };

      request.user = requestUser;

      return { statusCode: EStatusCode.OK };
    } catch (error) {
      return {
        statusCode: EStatusCode.Unauthorized,
        error: "Request token is expired or invalid",
      };
    }
  };
}
