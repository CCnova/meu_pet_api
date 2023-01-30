import { TRequest, TResponse } from "../../../../types";
import { IRegisterClientService } from "../../data/contracts";

export interface IRegisterClientUserController {
  handle: (
    request: IRegisterClientUserController.TRegisterRequest,
    response: IRegisterClientUserController.TRegisterResponse
  ) => Promise<IRegisterClientUserController.TRegisterResponse>;
}

export namespace IRegisterClientUserController {
  export type TRegisterRequestBody =
    IRegisterClientService.TRegisterClientUserDTO;
  export type TRegisterRequest = TRequest<TRegisterRequestBody>;

  export type TRegisterResponseBody = {
    user: IRegisterClientService.TRegisterClientUserResult;
  };
  export type TRegisterResponse = TResponse<TRegisterResponseBody>;

  export type TRegisterControllerConstructor = (
    registerService: IRegisterClientService
  ) => IRegisterClientUserController;
}
