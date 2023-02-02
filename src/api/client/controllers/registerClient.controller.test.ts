import { mock } from "jest-mock-extended";
import { EStatusCode } from "../../../types";
import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { IRegisterUserUseCase } from "../contracts/useCases.contracts";
import makeRegisterClientController, {
  TRegisterClientRequest,
  TRegisterClientResponse,
} from "./registerClient.controller";

describe("RegisterClientController", () => {
  const registerClient = mock<IRegisterUserUseCase>();
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
    const spy = jest.spyOn(registerClient, "execute");

    // when
    await sut.handle(request, response);

    // then
    expect(spy).toBeCalledTimes(1);
  });

  it("should return ValidationError when useCase returns ValidationError", async () => {
    // given
    const sut = makeRegisterClientController(registerClient);
    const expectedError = new ValidationError("any validation error");
    jest.spyOn(registerClient, "execute").mockResolvedValueOnce(expectedError);

    // when
    const result = await sut.handle(request, response);

    // then
    expect(result).toEqual({ data: null, error: expectedError });
  });

  it("should return InternalServerError when useCase returns InternalServerError", async () => {
    // given
    const sut = makeRegisterClientController(registerClient);
    const expectedError = new InternalServerError("any internal server error");
    jest.spyOn(registerClient, "execute").mockResolvedValueOnce(expectedError);

    // when
    const result = await sut.handle(request, response);

    // then
    expect(result).toEqual({ data: null, error: expectedError });
  });
});
