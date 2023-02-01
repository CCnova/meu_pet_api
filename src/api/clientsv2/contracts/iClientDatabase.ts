import * as ClientModel from "../client.model";

export type TInsertParams = Omit<ClientModel.IClient, "id">;
export type TInsertResult = ClientModel.IClient;

export interface IClientDatabase {
  insert: (params: TInsertParams) => Promise<TInsertResult>;
}
