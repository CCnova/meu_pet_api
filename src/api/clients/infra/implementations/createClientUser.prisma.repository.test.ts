import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { CreateClientUserPrismaRepository } from ".";
import { ICreateClientUserRepository } from "../contracts";

describe("CreateClientUserPrismaRepository", () => {
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = mockDeep<PrismaClient>();
  });

  it("should call prisma.client.clientUser.create", async () => {
    // given
    const spy = jest
      .spyOn(prismaClient.clientUser, "create")
      .mockImplementationOnce((f) => f as any);
    const sut = CreateClientUserPrismaRepository.createInstance(prismaClient);
    const dto: ICreateClientUserRepository.TCreateOneDTO = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-first-name",
      lastName: "any-last-name",
      password: "any-password",
      type: "TUTOR",
    };

    // when
    await sut.createOne(dto);

    // then
    expect(spy).toHaveBeenCalled();
  });

  it("should return data when prisma.client.clientUser.create return data", async () => {
    // given

    const sut = CreateClientUserPrismaRepository.createInstance(prismaClient);
    const dto: ICreateClientUserRepository.TCreateOneDTO = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-first-name",
      lastName: "any-last-name",
      password: "any-password",
      type: "TUTOR",
    };
    const spy = jest
      .spyOn(prismaClient.clientUser, "create")
      .mockResolvedValueOnce({ ...dto, id: -1 });

    // when
    const result = await sut.createOne(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual({ ...dto, id: -1 });
  });
});
