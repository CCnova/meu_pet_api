import { ProviderModel } from "@meu-pet/models";
import { DatabaseError } from "@meu-pet/types";
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { IProvider } from "../types";
import { ProviderPrismaRepository } from "./providerPrisma.repository";

describe("ProviderPrismaRepository", () => {
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = mockDeep<PrismaClient>();
  });

  it("should call prismaClient.create when creating a provider", async () => {
    // given
    const sut = new ProviderPrismaRepository(prismaClient);
    const spy = jest
      .spyOn(prismaClient.providerUser, "create")
      .mockImplementationOnce(() => Promise.resolve() as any);
    const data = ProviderModel.createProvider({
      avatar: "valid-avatar",
      dateOfBirth: "01/01/1990",
      email: "valid@email.com",
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      password: "valid-password",
    });

    // when
    await sut.insert(data as IProvider);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should return data when prismaClient.create returns data", async () => {
    // given
    const sut = new ProviderPrismaRepository(prismaClient);
    const data = ProviderModel.createProvider({
      avatar: "valid-avatar",
      dateOfBirth: "01/01/1990",
      email: "valid@email.com",
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      password: "valid-password",
    });
    jest
      .spyOn(prismaClient.providerUser, "create")
      .mockResolvedValueOnce(data as IProvider);

    // when
    const result = await sut.insert(data as IProvider);

    // then
    expect(result).toEqual(data);
  });

  it("should return DatabaseError when prismaClient.create throws", async () => {
    // given
    const sut = new ProviderPrismaRepository(prismaClient);
    const data = ProviderModel.createProvider({
      avatar: "valid-avatar",
      dateOfBirth: "01/01/1990",
      email: "valid@email.com",
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      password: "valid-password",
    });
    jest
      .spyOn(prismaClient.providerUser, "create")
      .mockImplementationOnce(() => Promise.reject() as any);

    // when
    const result = await sut.insert(data as IProvider);

    // then
    expect(result).toEqual(new DatabaseError("An unknown error has occurred"));
  });
});
