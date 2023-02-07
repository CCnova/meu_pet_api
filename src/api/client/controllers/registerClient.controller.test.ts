import { mock } from "jest-mock-extended";
import { EStatusCode } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import {
  TRegisterClientRequest,
  TRegisterClientResponse,
} from "../contracts/controllers.contracts";
import makeRegisterClientController from "./registerClient.controller";

describe("RegisterClientController", () => {
  const registerClient = jest.fn();
  const request = mock<TRegisterClientRequest>();
  const response = {
    statusCode: undefined,
    status(code: EStatusCode) {
      this.statusCode = code;
      return this;
    },
    send(data: any) {
      return data;
    },
  } as any as TRegisterClientResponse;

  it("should execute createClientUseCase", async () => {
    // given
    const sut = makeRegisterClientController(registerClient);

    // when
    await sut(request, response);

    // then
    expect(registerClient).toBeCalledTimes(1);
  });

  it("should return ValidationError when useCase returns ValidationError", async () => {
    // given
    const expectedError = new ValidationError("any validation error");
    registerClient.mockResolvedValueOnce(expectedError);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request, response);

    // then
    expect(result).toEqual({ data: null, error: expectedError });
  });

  it("should return InternalServerError when useCase returns InternalServerError", async () => {
    // given
    const expectedError = new InternalServerError("any internal server error");
    registerClient.mockResolvedValueOnce(expectedError);
    const sut = makeRegisterClientController(registerClient);

    // when
    const result = await sut(request, response);

    // then
    expect(result).toEqual({ data: null, error: expectedError });
  });
});
