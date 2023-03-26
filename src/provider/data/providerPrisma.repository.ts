import { prisma } from "@meu-pet/libs";
import { PrismaClient } from "@prisma/client";
import { IProviderDatabase } from "../contracts";
import { IProvider } from "../types";

export class ProviderPrismaRepository implements IProviderDatabase {
  constructor(private prismaClient: PrismaClient = prisma) {}

  insert(data: IProvider) {
    return this.prismaClient.providerUser.create({ data });
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
