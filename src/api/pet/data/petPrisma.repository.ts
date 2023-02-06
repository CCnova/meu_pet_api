import { PrismaClient } from "@prisma/client";
import { IPet } from "../../types";
import { IPetDatabase } from "../contracts";

export default function makePetPrismaRepository(
  prismaClient: PrismaClient
): IPetDatabase {
  return {
    insert(data: IPet) {
      return prismaClient.pet.create({ data });
    },

    async bulkInsert(data: IPet[]) {
      await prismaClient.pet.createMany({ data });

      return Promise.all(
        data.map((pet) =>
          prismaClient.pet.findFirstOrThrow({
            where: { id: pet.id },
          })
        )
      );
    },

    async delete(id: string) {
      const pet = prismaClient.pet.findUnique({ where: { id } });

      if (pet !== null) prismaClient.pet.delete({ where: { id } });

      return pet;
    },
  };
}
