import { ClientUser } from "@prisma/client";
import { IClientDatabase, TInsertParams } from "./contracts";
export interface IClient extends ClientUser {}

export const createClient = (
  clientDatabase: IClientDatabase,
  params: TInsertParams
): Promise<IClient> => {
  // Todo(CCnova): Add business rules validations
  return clientDatabase.insert(params);
};
