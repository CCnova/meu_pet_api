import { InternalServerError, ValidationError } from "../../types/errors.types";
import { TLoginRequest } from "../contracts/controllers.contracts";
import makeLoginController from "./login.controller";

describe("LoginController", () => {
  const login = jest.fn();
  const request: TLoginRequest = {
    body: {
      email: "fake@email.com",
      password: "fake-password",
    },
    params: {},
    query: {},
  };

  it("should execute login", async () => {
    // given
    const sut = makeLoginController(login);

    // when
    await sut(request);

    // then
    expect(login).toHaveBeenCalledTimes(1);
  });

  it("should return a ValidationError when use case returns validation error", async () => {
    // given
    const expectedError = new ValidationError("Email or Password invalid");
    login.mockResolvedValueOnce(expectedError);
    const sut = makeLoginController(login);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({
      error: {
        httpStatusCode: expectedError.httpStatusCode,
        message: expectedError.message,
      },
    });
  });

  it("should return a InternalServerError when use case returns internal server error", async () => {
    // given
    const expectedError = new InternalServerError("any internal server error");
    login.mockResolvedValueOnce(expectedError);
    const sut = makeLoginController(login);

    // when
    const result = await sut(request);

    // then
    expect(result.body).toEqual({ error: expectedError });
  });
});
