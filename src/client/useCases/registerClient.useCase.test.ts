import { mock } from "jest-mock-extended";
import { ClientModel, PetModel } from "../../models";
import { IPetDatabase } from "../../pet/contracts";
import { ValidationError } from "../../types/errors.types";
import { IClientDatabase } from "../contracts/data.contracts";
import { TRegisterClientDTO } from "../contracts/useCases.contracts";
import makeRegisterClientUseCase from "./registerClient.useCase";

jest.mock("../../models/index.ts", () => ({
  __esModule: true,
  ClientModel: mock<typeof ClientModel>(),
  PetModel: mock<typeof PetModel>(),
}));

jest.mock("../../utils/encryption.utils.ts", () => ({
  encrypt: jest.fn().mockResolvedValue('encrypted password')
}))

describe("RegisterClientUseCase", () => {
  const clientRepo = mock<IClientDatabase>();
  const petRepo = mock<IPetDatabase>();

  it("should return ValidationError when ClientModel.createClient returns error", async () => {
    // given
    const sut = makeRegisterClientUseCase({ clientRepo, petRepo });
    const spy = jest
      .spyOn(ClientModel, "createClient")
      .mockReturnValueOnce(new ValidationError("any-message"));
    const dto = mock<TRegisterClientDTO>();

    // when
    const result = await sut(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(new ValidationError("any-message"));
  });

  it("should call clientRepo.insert", async () => {
    // given
    const sut = makeRegisterClientUseCase({ clientRepo, petRepo });
    const spy = jest
      .spyOn(clientRepo, "insert")
      .mockImplementation(() => Promise.resolve() as any);
    const pet = mock<TRegisterClientDTO["pets"][number]>();
    const dto: TRegisterClientDTO = {
      ...mock<TRegisterClientDTO>(),
      pets: [pet],
    };
    jest
      .spyOn(ClientModel, "createClient")
      .mockReturnValueOnce({ ...dto, id: "any-id", dateOfBirth: new Date(dto.dateOfBirth) });

    // when
    await sut(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
