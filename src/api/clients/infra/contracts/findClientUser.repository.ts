import { PrismaClient } from "@prisma/client";
import { Maybe } from "../../../../types";
import { IClientUser } from "../../models/clientUser.model";

export interface IFindClientUserRespository {
  findOne: (
    dto: IFindClientUserRespository.TFindOneDTO
  ) => Promise<IFindClientUserRespository.TFindOneResult>;
}

export namespace IFindClientUserRespository {
  export type TFindOneDTO = Partial<IClientUser>;
  export type TFindOneResult = Maybe<IClientUser>;
  export type TFindClientsDatabaseClientConstructor = (
    client: PrismaClient
  ) => IFindClientUserRespository;
}
