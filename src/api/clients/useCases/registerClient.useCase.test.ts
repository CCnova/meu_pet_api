import { mock } from "jest-mock-extended";
import { ValidationError } from "../../../types/errors.types";
import { ClientModel } from "../../models";
import { IClientDatabase } from "../contracts/data.contracts";
import { TRegisterClientUserDTO } from "../contracts/useCases.contracts";
import makeRegisterClientUseCase from "./registerClient.useCase";

jest.mock("../../models/index.ts", () => ({
  __esModule: true,
  ClientModel: mock<typeof ClientModel>(),
}));

describe("RegisterClientUseCase", () => {
  const clientRepo = mock<IClientDatabase>();

  it("should return ValidationError when ClientModel.createClient returns error", async () => {
    // given
    const sut = makeRegisterClientUseCase(clientRepo);
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
    const sut = makeRegisterClientUseCase(clientRepo);
    const spy = jest.spyOn(clientRepo, "insert");
    const dto = mock<TRegisterClientUserDTO>();
    jest
      .spyOn(ClientModel, "createClient")
      .mockReturnValueOnce({ id: "any-id", ...dto });

    // when
    await sut.execute(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
