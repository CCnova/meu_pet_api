import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { PetModel } from "../../models";
import { IPet } from "../types";
import { PetPrismaRepository } from "./petPrisma.repository";

describe("PetPrismaRepository", () => {
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = mockDeep<PrismaClient>();
  });

  it("should call prismaClient.create when creating a Client", async () => {
    // given
    const sut = new PetPrismaRepository(prismaClient);
    const spy = jest.spyOn(prismaClient.pet, "create");
    const data = PetModel.createPet({
      dateOfBirth: new Date(),
      name: "any-name",
      breed: "any-breed",
    });

    // when
    await sut.insert(data as IPet);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should return data when prismaClient.create returns data", async () => {
    // given
    const sut = new PetPrismaRepository(prismaClient);
    const data = PetModel.createPet({
      dateOfBirth: new Date(),
      name: "any-name",
      breed: "any-breed",
    });
    jest.spyOn(prismaClient.pet, "create").mockResolvedValueOnce(data as IPet);

    // when
    const result = await sut.insert(data as IPet);

    // then
    expect(result).toEqual(data);
  });
});
