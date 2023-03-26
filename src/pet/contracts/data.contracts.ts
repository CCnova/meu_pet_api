import { ICRUDDatabase } from "../../contracts/data.contracts";
import { IPet } from "../types";

export interface IPetDatabase extends ICRUDDatabase<IPet> {}
