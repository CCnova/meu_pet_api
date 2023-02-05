import { IPet } from "../../types";

export interface IPetDatabase {
  insert: (data: IPet) => Promise<IPet>;
  bulkInsert: (data: IPet[]) => Promise<IPet[]>;
}
