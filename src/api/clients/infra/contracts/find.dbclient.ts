import { ClientUser } from "@prisma/client";
import { Maybe } from "../../../../types";

export interface IFindClientsDatabaseClient {
  findOne: (
    dto: IFindClientsDatabaseClient.TFindOneDTO
  ) => Promise<IFindClientsDatabaseClient.TFindOneResult>;
}

export namespace IFindClientsDatabaseClient {
  export type TFindOneDTO = Partial<ClientUser>;
  export type TFindOneResult = Maybe<ClientUser>;
  export type TFindClientsDatabaseClientConstructor =
    () => IFindClientsDatabaseClient;
}
