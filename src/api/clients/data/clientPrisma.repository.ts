import { PrismaClient } from "@prisma/client";
import { IClient } from "../../types/client.types";
import { IClientDatabase } from "../contracts/data.contracts";

export default function makeClientPrismaRepository(
  prismaClient: PrismaClient
): IClientDatabase {
  return {
    insert(data: IClient) {
      return prismaClient.clientUser.create({ data });
    },
  };
}
