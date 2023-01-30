import { TRequest, TResponse } from "../../../../types";
import { IAuthenticateClientService } from "../../data/contracts";

export interface IAuthenticateClientUserController {
  handle: (
    request: IAuthenticateClientUserController.TAuthenticateRequest,
    response: IAuthenticateClientUserController.TAuthenticateResponse
  ) => Promise<IAuthenticateClientUserController.TAuthenticateResponse>;
}

export namespace IAuthenticateClientUserController {
  export type TAuthenticateRequestBody = {
    email: string;
    password: string;
  };
  export type TAuthenticateRequest = TRequest<TAuthenticateRequestBody>;

  export type TAuthenticateResponseBody = {
    user: IAuthenticateClientService.TAuthenticateClientResult;
  };
  export type TAuthenticateResponse = TResponse<TAuthenticateResponseBody>;

  export type TAuthenticateControllerConstructor = (
    authService: IAuthenticateClientService
  ) => IAuthenticateClientUserController;
}
