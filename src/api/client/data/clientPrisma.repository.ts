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

    async bulkInsert(data: IClient[]) {
      await prismaClient.clientUser.createMany({ data });

      return Promise.all(
        data.map((client) =>
          prismaClient.clientUser.findFirstOrThrow({
            where: { id: client.id },
          })
        )
      );
    },

    async delete(id: string) {
      const client = this.findOne({ id });

      if (client !== null) prismaClient.clientUser.delete({ where: { id } });

      return client;
    },

    async findOne(where: Partial<IClient>) {
      return prismaClient.clientUser.findUnique({ where });
    },
  };
}
