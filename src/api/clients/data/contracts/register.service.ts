import { ClientUser } from "@prisma/client";
import { IInsertClientsDatabaseClient } from "../../infra/contracts/insert.dbclient";
import { RegisterError } from "../../models";

export interface IRegisterClientService {
  execute: (
    dto: IRegisterClientService.TRegisterClientUserDTO
  ) => Promise<IRegisterClientService.TRegisterClientUserResult>;
}

export namespace IRegisterClientService {
  export type TRegisterClientUserDTO = Omit<ClientUser, "id">;
  export type TRegisterClientUserResult = ClientUser | RegisterError;
  export type TRegisterClientServiceConstructor = (
    clientsDatabase: IInsertClientsDatabaseClient
  ) => IRegisterClientService;
}
