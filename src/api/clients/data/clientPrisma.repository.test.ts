import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { ClientModel } from "../../models";
import { IClient } from "../../types/client.types";
import makeClientPrismaRepository from "./clientPrisma.repository";

describe("ClientPrismaRepository", () => {
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = mockDeep<PrismaClient>();
  });

  it("should call prismaClient.create when creating a Client", async () => {
    // given
    const sut = makeClientPrismaRepository(prismaClient);
    const spy = jest.spyOn(prismaClient.clientUser, "create");
    const data = ClientModel.createClient({
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-first-name",
      lastName: "any-last-name",
      password: "any-password",
      type: "TUTOR",
    });

    // when
    await sut.insert(data as IClient);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should return data when prismaClient.create returns data", async () => {
    // given
    const sut = makeClientPrismaRepository(prismaClient);
    const data = ClientModel.createClient({
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-first-name",
      lastName: "any-last-name",
      password: "any-password",
      type: "TUTOR",
    });
    jest
      .spyOn(prismaClient.clientUser, "create")
      .mockResolvedValueOnce(data as IClient);

    // when
    const result = await sut.insert(data as IClient);

    // then
    expect(result).toEqual(data);
  });
});
