import {
  createMProvider,
  createMRegisterProviderRequestBody,
} from "@meu-pet/factories";
import {
  EStatusCode,
  InternalServerError,
  ValidationError,
} from "@meu-pet/types";
import { TRegisterProviderRequest } from "../contracts/controllers.contracts";
import makeRegisterProviderController from "./registerProvider.controller";

describe("RegisterProviderController", () => {
  const registerProviderUseCase = jest.fn();

  it("should execute register provider use case", async () => {
    // given
    const sut = makeRegisterProviderController({
      registerProvider: registerProviderUseCase,
    });
    const mockRequest: TRegisterProviderRequest = {
      body: createMRegisterProviderRequestBody(),
      params: {},
      query: {},
    };

    // when
    await sut(mockRequest);

    // then
    expect(registerProviderUseCase).toHaveBeenCalledTimes(1);
  });

  it("should return the correct response when use case return ValidationError", async () => {
    // given
    const sut = makeRegisterProviderController({
      registerProvider: registerProviderUseCase,
    });
    const mockRequest: TRegisterProviderRequest = {
      body: createMRegisterProviderRequestBody(),
      params: {},
      query: {},
    };
    const expectedError = new ValidationError("");
    const expectedResponse = {
      statusCode: EStatusCode.UnprocessableEntity,
      body: { error: expectedError },
    };
    registerProviderUseCase.mockResolvedValueOnce(expectedError);

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResponse);
  });

  it("should return the correct response when use case return InternalServerError", async () => {
    // given
    const sut = makeRegisterProviderController({
      registerProvider: registerProviderUseCase,
    });
    const mockRequest: TRegisterProviderRequest = {
      body: createMRegisterProviderRequestBody(),
      params: {},
      query: {},
    };
    const expectedError = new InternalServerError("");
    const expectedResponse = {
      statusCode: EStatusCode.InternalServerError,
      body: { error: expectedError },
    };
    registerProviderUseCase.mockResolvedValueOnce(expectedError);

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResponse);
  });

  it("should return the correct response when use case runs succesfully", async () => {
    // given
    const sut = makeRegisterProviderController({
      registerProvider: registerProviderUseCase,
    });
    const mockRequest: TRegisterProviderRequest = {
      body: createMRegisterProviderRequestBody(),
      params: {},
      query: {},
    };
    const expectedData = createMProvider();
    const expectedResponse = {
      statusCode: EStatusCode.Created,
      body: { data: expectedData },
    };
    registerProviderUseCase.mockResolvedValueOnce(expectedData);

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResponse);
  });
});
