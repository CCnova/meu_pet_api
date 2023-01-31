import { PrismaClient } from "@prisma/client";
import { ICreateClientUserRepository } from "../contracts";

export const createInstance: ICreateClientUserRepository.TCreateClientUserRepositoryConstructor =
  (prismaClient: PrismaClient) => {
    return {
      createOne(
        dto: ICreateClientUserRepository.TCreateOneDTO
      ): Promise<ICreateClientUserRepository.TCreateOneResult> {
        return prismaClient.clientUser.create({ data: dto });
      },
    };
  };
