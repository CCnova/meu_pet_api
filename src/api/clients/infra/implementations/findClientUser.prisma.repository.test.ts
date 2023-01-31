import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { FindClientUserPrismaRepository } from ".";
import { IFindClientUserRespository } from "../contracts";

describe("CreateClientUserPrismaRepository", () => {
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = mockDeep<PrismaClient>();
  });

  it("should call prisma.client.clientUser.findUnique", async () => {
    // given
    const spy = jest
      .spyOn(prismaClient.clientUser, "findUnique")
      .mockImplementationOnce((f) => f as any);
    const sut = FindClientUserPrismaRepository.createInstance(prismaClient);
    const dto: IFindClientUserRespository.TFindOneDTO = {
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
    await sut.findOne(dto);

    // then
    expect(spy).toHaveBeenCalled();
  });

  it("should return data when prisma.client.clientUser.findUnique return data", async () => {
    // given

    const sut = FindClientUserPrismaRepository.createInstance(prismaClient);
    const dto: IFindClientUserRespository.TFindOneDTO = {
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
      .spyOn(prismaClient.clientUser, "findUnique")
      .mockResolvedValueOnce({
        ...dto,
        id: -1,
      } as IFindClientUserRespository.TFindOneResult);

    // when
    const result = await sut.findOne(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ where: dto });
    expect(result).toEqual({ ...dto, id: -1 });
  });
});
