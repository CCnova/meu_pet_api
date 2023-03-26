import { prisma } from "@meu-pet/libs";
import { PrismaClient } from "@prisma/client";
import { IPetDatabase } from "../contracts";
import { IPet } from "../types";

export class PetPrismaRepository implements IPetDatabase {
  constructor(private prismaClient: PrismaClient = prisma) {}

  insert(data: IPet) {
    return this.prismaClient.pet.create({ data });
  }

  async bulkInsert(data: IPet[]) {
    await this.prismaClient.pet.createMany({ data });

    return Promise.all(
      data.map((pet) =>
        this.prismaClient.pet.findFirstOrThrow({
          where: { id: pet.id },
        })
      )
    );
  }

  async delete(id: string) {
    const pet = this.prismaClient.pet.findUnique({ where: { id } });

    if (pet !== null) this.prismaClient.pet.delete({ where: { id } });

    return pet;
  }

  async findOne() {
    return null;
  }
}
