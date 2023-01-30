import { AuthenticateController } from ".";
import { EStatusCode } from "../../../../types";
import { AuthenticationError } from "../../models";

describe("AuthenticateController", () => {
  const mockService = {
    execute: jest.fn(),
  };
  const mockResponse = {
    statusCode: EStatusCode.Accepted,
    status(statusCode: EStatusCode) {
      this.statusCode = statusCode;
      return this;
    },
    send(data: any) {
      return { ...this, data };
    },
  };
  it("should call service.execute with correct arguments", async () => {
    // given
    const sut = AuthenticateController.createInstance(mockService);
    const body = {
      email: "fake@email.com",
      password: "any-password",
    };
    const mockRequest = {
      body,
    };
    const spy = jest.spyOn(mockService, "execute");

    // when
    await sut.handle(mockRequest as any, mockResponse as any);

    // then
    expect(spy).toHaveBeenCalledWith(mockRequest.body);
  });

  it("should give the correct response when a error is returned", async () => {
    // given
    const sut = AuthenticateController.createInstance(mockService);
    const body = {
      email: "fake@email.com",
      password: "any-password",
    };
    const mockRequest = {
      body,
    };
    jest
      .spyOn(mockService, "execute")
      .mockResolvedValueOnce(new AuthenticationError());

    // when
    const result = await sut.handle(mockRequest as any, mockResponse as any);

    // then
    expect(result.statusCode).toBe(EStatusCode.InternalServerError);
  });

  it("should give the correct response when a user is returned", async () => {
    // given
    const sut = AuthenticateController.createInstance(mockService);
    const body = {
      email: "fake@email.com",
      password: "any-password",
    };
    const mockRequest = {
      body,
    };
    jest.spyOn(mockService, "execute").mockResolvedValueOnce({ ...body });

    // when
    const result: any = await sut.handle(
      mockRequest as any,
      mockResponse as any
    );

    // then
    expect(result.data.user).toBeDefined();
    expect(result.data.user.email).toBe(body.email);
  });
});
