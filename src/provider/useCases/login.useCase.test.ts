import { createMLoginProviderDTO, createMProvider } from "@meu-pet/factories";
import { ProviderModel } from "@meu-pet/models";
import { NotFoundError, ValidationError } from "@meu-pet/types";
import { compare } from "@meu-pet/utils";
import { mock } from "jest-mock-extended";
import { IProviderDatabase } from "../contracts";
import makeLoginUseCase from "./login.useCase";

describe("Provider LoginUseCase", () => {
  const providerRepository = mock<IProviderDatabase>();
  const authenticationTokenGeneratorFn = () => "auth-token";

  it("should return ValidationError when ProviderModel returns ValidationError", async () => {
    // given
    const sut = makeLoginUseCase({
      providerRepository,
      encryptionCompareFn: compare,
      authenticationTokenGeneratorFn,
    });
    const expectedError = new ValidationError("");
    const dto = createMLoginProviderDTO();
    jest.spyOn(ProviderModel, "validate").mockReturnValueOnce(expectedError);

    // when
    const result = await sut(dto);

    // then
    expect(result).toEqual(expectedError);
  });

  it("should return NotFoundError when ProviderRepository returns null", async () => {
    // given
    const sut = makeLoginUseCase({
      providerRepository,
      encryptionCompareFn: compare,
      authenticationTokenGeneratorFn,
    });
    const dto = createMLoginProviderDTO();
    const expectedError = new NotFoundError(
      `Provider user with email=${dto.email} not found`
    );
    providerRepository.findOne.mockResolvedValueOnce(null);

    // when
    const result = await sut(dto);

    // then
    expect(result).toEqual(expectedError);
  });

  it("should return ValidationError when encryptionCompareFn returns false", async () => {
    // given
    const sut = makeLoginUseCase({
      providerRepository,
      encryptionCompareFn: () => Promise.resolve(false),
      authenticationTokenGeneratorFn,
    });
    const dto = createMLoginProviderDTO();
    const expectedError = new ValidationError("Invalid password");
    providerRepository.findOne.mockResolvedValueOnce(createMProvider());

    // when
    const result = await sut(dto);

    // then
    expect(result).toEqual(expectedError);
  });

  it("should return the correct data when dto is valid", async () => {
    // given
    const sut = makeLoginUseCase({
      providerRepository,
      encryptionCompareFn: () => Promise.resolve(true),
      authenticationTokenGeneratorFn,
    });
    const dto = createMLoginProviderDTO();
    const expectedProvider = createMProvider(dto);
    providerRepository.findOne.mockResolvedValueOnce(expectedProvider);
    const { password: _, ...expectedPublicData } = expectedProvider;

    // when
    const result = await sut(dto);

    // then
    expect(result).toEqual({ user: expectedPublicData, token: "auth-token" });
  });
});
