import { IDatabase } from "../../contracts/data.contracts";
import { IPet } from "../../types";

export interface IPetDatabase extends IDatabase<IPet> {}
