import { createMAuthenticatedProviderInfo } from "@meu-pet/factories";
import {
  EStatusCode,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@meu-pet/types";
import makeLoginController from "./login.controller";

describe("Provider LoginController", () => {
  const loginUseCase = jest.fn();

  it("should return ValidationError when email is missing", async () => {
    // given
    const sut = makeLoginController({ login: loginUseCase });
    const mockRequest: any = {
      body: { password: "123456" },
    };
    const expectedResult = {
      statusCode: EStatusCode.UnprocessableEntity,
      body: {
        error: new Error("email must be a string"),
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return ValidationError when password is missing", async () => {
    // given
    const sut = makeLoginController({ login: loginUseCase });
    const mockRequest: any = {
      body: { email: "any@email.com" },
    };
    const expectedResult = {
      statusCode: EStatusCode.UnprocessableEntity,
      body: {
        error: new Error("password must be a string"),
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return ValidationError when useCase returns ValidationError", async () => {
    // given
    loginUseCase.mockImplementationOnce(
      () => new ValidationError("Invalid email or password")
    );
    const sut = makeLoginController({ login: loginUseCase });
    const mockRequest: any = {
      body: { email: "valid@email.com", password: "valid-password" },
    };
    const expectedResult = {
      statusCode: EStatusCode.UnprocessableEntity,
      body: {
        error: new ValidationError("Invalid email or password"),
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return NotFoundError when useCase returns NotFoundError", async () => {
    // given
    loginUseCase.mockImplementationOnce(
      () => new NotFoundError("Invalid email or password")
    );
    const sut = makeLoginController({ login: loginUseCase });
    const mockRequest: any = {
      body: { email: "valid@email.com", password: "valid-password" },
    };
    const expectedResult = {
      statusCode: EStatusCode.NotFound,
      body: {
        error: new NotFoundError("Invalid email or password"),
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return InternalServerError when useCase returns InternalServerError", async () => {
    // given
    loginUseCase.mockImplementationOnce(
      () =>
        new InternalServerError(
          "A unknown error has occurred while trying to login"
        )
    );
    const sut = makeLoginController({ login: loginUseCase });
    const mockRequest: any = {
      body: { email: "valid@email.com", password: "valid-password" },
    };
    const expectedResult = {
      statusCode: EStatusCode.InternalServerError,
      body: {
        error: new InternalServerError(
          "A unknown error has occurred while trying to login"
        ),
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return data when useCase returns data", async () => {
    // given
    const sut = makeLoginController({ login: loginUseCase });
    const expectedData = createMAuthenticatedProviderInfo();
    loginUseCase.mockImplementationOnce(() => expectedData);
    const mockRequest: any = {
      body: { email: "valid@email.com", password: "valid-password" },
    };
    const expectedResult = {
      statusCode: EStatusCode.OK,
      body: {
        data: expectedData,
      },
    };

    // when
    const result = await sut(mockRequest);

    // then
    expect(result).toEqual(expectedResult);
  });
});
