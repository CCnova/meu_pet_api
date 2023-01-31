import { PrismaClient } from "@prisma/client";
import { IClientUser } from "../../models/clientUser.model";

export interface ICreateClientUserRepository {
  createOne: (
    dto: ICreateClientUserRepository.TCreateOneDTO
  ) => Promise<ICreateClientUserRepository.TCreateOneResult>;
}

export namespace ICreateClientUserRepository {
  export type TCreateOneDTO = Omit<IClientUser, "id">;
  export type TCreateOneResult = IClientUser;
  export type TCreateClientUserRepositoryConstructor = (
    client: PrismaClient
  ) => ICreateClientUserRepository;
}
