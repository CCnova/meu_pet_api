import { IPet } from "../../api/types";
import { IDatabase } from "../../contracts/data.contracts";

export interface IPetDatabase extends IDatabase<IPet> {}
