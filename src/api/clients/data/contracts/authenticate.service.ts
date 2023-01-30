import { ClientUser } from "@prisma/client";
import { IFindClientsDatabaseClient } from "../../infra/contracts/find.dbclient";
import { AuthenticationError } from "../../models";

export interface IAuthenticateClientService {
  execute: (
    dto: IAuthenticateClientService.TAuthenticateClientDTO
  ) => Promise<IAuthenticateClientService.TAuthenticateClientResult>;
}

export namespace IAuthenticateClientService {
  export type TAuthenticateClientDTO = {
    email: string;
    password: string;
  };

  export type TAuthenticateClientResult = ClientUser | AuthenticationError;

  export type TRegisterClientServiceConstructor = (
    clientsDatabase: IFindClientsDatabaseClient
  ) => IAuthenticateClientService;
}
