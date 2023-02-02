import { IClient } from "../../types/client.types";

export interface IClientDatabase {
  insert: (data: IClient) => Promise<IClient>;
}
