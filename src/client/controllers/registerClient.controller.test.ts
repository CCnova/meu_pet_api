import {
  createMClientWithPets,
  makeRegisterClientRequestBody,
} from "../../factories";
import { InternalServerError, ValidationError } from "../../types/errors.types";
import { TRegisterClientRequest } from "../contracts/controllers.contracts";
import makeRegisterClientController from "./registerClient.controller";
describe("RegisterClientController", () => {
  const registerClient = jest.fn();
  const request: TRegisterClientRequest = {
    body: makeRegisterClientRequestBody(),
    params: {},
    query: {},
  };

  it("should execute createClientUseCase", async () => {
    // given
    const sut = makeRegisterClientController(registerClient);

    // when
    await sut(request);

    // then
    expect(registerClient).toBeCalledTimes(1);
  });

  it("should return ValidationError when useCase returns ValidationError", async () => {
    // given
    const expectedError = new ValidationError("any validation error");
    registerClient.mockResolvedValueOnce(expectedError);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({ error: expectedError });
  });

  it("should return InternalServerError when useCase returns InternalServerError", async () => {
    // given
    const expectedError = new InternalServerError("any internal server error");
    registerClient.mockResolvedValueOnce(expectedError);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({ error: expectedError });
  });

  it("should return ValidationError[] when useCase returns ValidationError[]", async () => {
    // given
    const expectedErrors = [new ValidationError("any validation error")];
    registerClient.mockResolvedValueOnce(expectedErrors);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({
      errors: expectedErrors,
    });
  });

  it("should return data when useCase returns data", async () => {
    // given
    const expectedData = createMClientWithPets();
    registerClient.mockResolvedValueOnce(expectedData);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({ data: expectedData });
  });
});
