import { IDatabase } from "../../contracts/data.contracts";
import { IClient } from "../../types/client.types";

export interface IClientDatabase extends IDatabase<IClient> {}
