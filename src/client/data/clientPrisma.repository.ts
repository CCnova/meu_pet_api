import { prismaAdapter } from "@meu-pet/adapters";
import { prisma } from "@meu-pet/libs";
import { DatabaseError } from "@meu-pet/types";
import { logger } from "@meu-pet/utils";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { IClientDatabase } from "../contracts";
import { IClient } from "../types";

export class ClientPrismaRepository implements IClientDatabase {
  constructor(
    private prismaClient: PrismaClient = prisma,
    private prismaErrorAdapter: prismaAdapter.IPrismaErrorAdapter = new prismaAdapter.PrismaErrorAdapter()
  ) {}

  insert(data: IClient) {
    return this.prismaClient.clientUser.create({ data }).catch((error) => {
      logger.log.error(
        `An error has occurred while trying to create clientUser`,
        error
      );
      if (error instanceof PrismaClientKnownRequestError)
        return this.prismaErrorAdapter.handleKnownRequestError(error);

      return new DatabaseError("An unknown error has occurred");
    });
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

  async list(where: Partial<IClient>) {
    return this.prismaClient.clientUser.findMany({ where });
  }
}
