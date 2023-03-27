import {
  createMProvider,
  createMRegisterProviderDTO,
} from "@meu-pet/factories";
import { InternalServerError, ValidationError } from "@meu-pet/types";
import { mock } from "jest-mock-extended";
import { ProviderModel } from "../../models";
import { IProviderDatabase } from "../contracts";
import { TRegisterProviderDTO } from "../contracts/useCases.contracts";
import makeRegisterProviderUseCase from "./registerProvider.useCase";

jest.mock("../../models/index.ts", () => ({
  __esModule: true,
  ProviderModel: mock<typeof ProviderModel>(),
}));

describe("RegisterProviderUseCase", () => {
  const providerRepo = mock<IProviderDatabase>();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return ValidationError when ProviderModel.create return ValidationError", async () => {
    // given
    const sut = makeRegisterProviderUseCase({ providerRepo });
    const expectedError = new ValidationError("any-validation-error");
    const spy = jest
      .spyOn(ProviderModel, "createProvider")
      .mockReturnValueOnce(expectedError);

    // In this case the dto does not matter because we are mocking the
    // return value of ProviderModel
    const dto = mock<TRegisterProviderDTO>();

    // when
    const result = await sut(dto);

    // then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedError);
  });

  it("should return InternalServerError when repository throws", async () => {
    // given
    const sut = makeRegisterProviderUseCase({ providerRepo });
    const dto = createMRegisterProviderDTO();
    const expectedError = new InternalServerError(
      `An unknown error has occurred while trying to register new provider user. If this persist, please contact support`
    );
    jest.spyOn(providerRepo, "insert").mockRejectedValueOnce(new Error());
    jest
      .spyOn(ProviderModel, "createProvider")
      .mockImplementationOnce(createMProvider);

    // when
    const result = await sut(dto);

    // then
    expect(result).toEqual(expectedError);
  });

  it("should return Provider when repository returns Provider", async () => {
    // given
    const sut = makeRegisterProviderUseCase({ providerRepo });
    const dto = createMRegisterProviderDTO();
    const expectedData = createMProvider();
    jest
      .spyOn(ProviderModel, "createProvider")
      .mockImplementationOnce(createMProvider);
    jest.spyOn(providerRepo, "insert").mockResolvedValueOnce(expectedData);

    // when
    const result = await sut(dto);

    // then
    expect(providerRepo.insert).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedData);
  });
});
