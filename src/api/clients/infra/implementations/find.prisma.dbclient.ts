import { prisma } from "../../../../libs";
import { IFindClientsDatabaseClient } from "../contracts";

export const createInstance: IFindClientsDatabaseClient.TFindClientsDatabaseClientConstructor =
  () => {
    return {
      findOne(dto) {
        return prisma.client.clientUser.findUnique({ where: dto });
      },
    };
  };
