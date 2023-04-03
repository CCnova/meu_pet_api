import { prismaAdapter } from "@meu-pet/adapters";
import { prisma } from "@meu-pet/libs";
import { DatabaseError } from "@meu-pet/types";
import { logger } from "@meu-pet/utils";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { IProviderDatabase } from "../contracts";
import { IProvider } from "../types";

export class ProviderPrismaRepository implements IProviderDatabase {
  constructor(
    private prismaClient: PrismaClient = prisma,
    private prismaErrorAdapter: prismaAdapter.IPrismaErrorAdapter = new prismaAdapter.PrismaErrorAdapter()
  ) {}

  insert(data: IProvider) {
    return this.prismaClient.providerUser.create({ data }).catch((error) => {
      logger.log.error(
        `An error has occurred while trying to create clientUser`,
        error
      );
      if (error instanceof PrismaClientKnownRequestError)
        return this.prismaErrorAdapter.handleKnownRequestError(error);

      return new DatabaseError("An unknown error has occurred");
    });
  }

  async bulkInsert(data: IProvider[]) {
    await this.prismaClient.providerUser.createMany({ data });

    return Promise.all(
      data.map((provider) =>
        this.prismaClient.providerUser.findUniqueOrThrow({
          where: { id: provider.id },
        })
      )
    );
  }

  async findOne(where: Partial<IProvider>) {
    return this.prismaClient.providerUser.findUnique({ where });
  }

  async delete(id: string) {
    const provider = this.findOne({ id });

    if (provider !== null)
      this.prismaClient.providerUser.delete({ where: { id } });

    return provider;
  }
}
