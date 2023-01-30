import { prisma } from "../../../../libs";
import { IInsertClientsDatabaseClient } from "../contracts";

export const createInstance: IInsertClientsDatabaseClient.TInserClientsDatabaseClientConstructor =
  () => {
    return {
      insertOne(dto) {
        return prisma.client.clientUser.create({ data: dto });
      },
    };
  };
