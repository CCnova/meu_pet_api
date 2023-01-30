import { ClientUser } from "@prisma/client";

export interface IInsertClientsDatabaseClient {
  insertOne: (
    dto: IInsertClientsDatabaseClient.TInsertOneDTO
  ) => Promise<IInsertClientsDatabaseClient.TInsertOneResult>;
}

export namespace IInsertClientsDatabaseClient {
  export type TInsertOneDTO = Omit<ClientUser, "id">;
  export type TInsertOneResult = ClientUser;
  export type TInserClientsDatabaseClientConstructor =
    () => IInsertClientsDatabaseClient;
}
