import { RegisterController } from ".";
import { EStatusCode } from "../../../../types";
import { RegisterError } from "../../models";
import { IRegisterClientUserController } from "../contracts";

describe("RegisterClientUserController", () => {
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
  it("should call service.execute", async () => {
    // given
    const sut = RegisterController.createInstance(mockService);
    const body: IRegisterClientUserController.TRegisterRequestBody = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-firstname",
      lastName: "any-lastname",
      password: "any-password",
      type: "TUTOR",
    };
    const mockRequest = {
      body,
    };
    const spy = jest.spyOn(mockService, "execute");

    // when
    await sut.handle(mockRequest as any, mockResponse as any);

    // then
    expect(spy).toHaveBeenCalledWith(body);
  });

  it("should set correct statusCode when service.execute returns error", async () => {
    // given
    const sut = RegisterController.createInstance(mockService);
    const body: IRegisterClientUserController.TRegisterRequestBody = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-firstname",
      lastName: "any-lastname",
      password: "any-password",
      type: "TUTOR",
    };
    const mockRequest = {
      body,
    };
    jest
      .spyOn(mockService, "execute")
      .mockResolvedValueOnce(new RegisterError());

    // when
    const result = await sut.handle(mockRequest as any, mockResponse as any);

    // then
    expect(result.statusCode).toBe(EStatusCode.InternalServerError);
  });

  it("should return user returned by service.execute", async () => {
    // given
    const sut = RegisterController.createInstance(mockService);
    const body: IRegisterClientUserController.TRegisterRequestBody = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date(),
      email: "any@email.com",
      firstName: "any-firstname",
      lastName: "any-lastname",
      password: "any-password",
      type: "TUTOR",
    };
    const mockRequest = {
      body,
    };
    jest
      .spyOn(mockService, "execute")
      .mockResolvedValueOnce({ id: -1, ...body });

    // when
    const result: any = await sut.handle(
      mockRequest as any,
      mockResponse as any
    );

    // then
    expect(result.data.user).toEqual({ id: -1, ...body });
  });
});
