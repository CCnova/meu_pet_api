import { PrismaClient } from "@prisma/client";
import { IFindClientUserRespository } from "../contracts";

export const createInstance: IFindClientUserRespository.TFindClientsDatabaseClientConstructor =
  (prismaClient: PrismaClient) => {
    return {
      findOne(
        dto: IFindClientUserRespository.TFindOneDTO
      ): Promise<IFindClientUserRespository.TFindOneResult> {
        return prismaClient.clientUser.findUnique({ where: dto });
      },
    };
  };
