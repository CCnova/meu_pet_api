import { mock } from "jest-mock-extended";
import { ValidationError } from "../../../types/errors.types";
import { ClientModel, PetModel } from "../../models";
import { IPetDatabase } from "../../pet/contracts";
import { IClientDatabase } from "../contracts/data.contracts";
import { TRegisterClientUserDTO } from "../contracts/useCases.contracts";
import makeRegisterClientUseCase from "./registerClient.useCase";

jest.mock("../../models/index.ts", () => ({
  __esModule: true,
  ClientModel: mock<typeof ClientModel>(),
  PetModel: mock<typeof PetModel>(),
}));

describe("RegisterClientUseCase", () => {
  const clientRepo = mock<IClientDatabase>();
  const petRepo = mock<IPetDatabase>();

  it("should return ValidationError when ClientModel.createClient returns error", async () => {
    // given
    const sut = makeRegisterClientUseCase({ clientRepo, petRepo });
    const spy = jest
      .spyOn(ClientModel, "createClient")
      .mockReturnValueOnce(new ValidationError("any-message"));
    const dto = mock<TRegisterClientUserDTO>();

    // when
    const result = await sut.execute(dto);

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
    const pet = mock<TRegisterClientUserDTO["pets"][number]>();
    const dto: TRegisterClientUserDTO = {
      ...mock<TRegisterClientUserDTO>(),
      pets: [pet],
    };
    jest
      .spyOn(ClientModel, "createClient")
      .mockReturnValueOnce({ id: "any-id", ...dto });

    // when
    await sut.execute(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
