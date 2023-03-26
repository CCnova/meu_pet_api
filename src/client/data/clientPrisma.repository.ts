import { prisma } from "@meu-pet/libs";
import { PrismaClient } from "@prisma/client";
import { IClientDatabase } from "../contracts";
import { IClient } from "../types";

export class ClientPrismaRepository implements IClientDatabase {
  constructor(private prismaClient: PrismaClient = prisma) {}

  insert(data: IClient) {
    return this.prismaClient.clientUser.create({ data });
  }

  async bulkInsert(data: IClient[]) {
    await this.prismaClient.clientUser.createMany({ data });

    return Promise.all(
      data.map((client) =>
        this.prismaClient.clientUser.findUniqueOrThrow({
          where: { id: client.id },
        })
      )
    );
  }

  async findOne(where: Partial<IClient>) {
    return this.prismaClient.clientUser.findUnique({ where });
  }

  async delete(id: string) {
    const client = this.findOne({ id });

    if (client !== null) this.prismaClient.clientUser.delete({ where: { id } });

    return client;
  }
}
