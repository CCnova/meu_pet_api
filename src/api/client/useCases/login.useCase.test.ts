import { mock } from "jest-mock-extended";
import { NotFoundError, ValidationError } from "../../../types/errors.types";
import { encrypt } from "../../../utils";
import { ClientModel } from "../../models";
import { IClient, TAuthenticatedClientInfo } from "../../types";
import { IClientDatabase } from "../contracts";
import makeLoginUseCase from "./login.useCase";

describe("AuthenticateClientUseCase", () => {
  const clientRepo = mock<IClientDatabase>();

  it("shound return a validation error when Model.validate returns error", async () => {
    // given
    const sut = makeLoginUseCase(clientRepo);
    const expectedError = new ValidationError("any-validation-error");
    jest.spyOn(ClientModel, "validate").mockReturnValueOnce(expectedError);
    const dto = {
      email: "any@email.com",
      password: "any-password",
    };

    //when
    const useCaseResult = await sut(dto);

    // then
    expect(useCaseResult).toEqual(expectedError);
  });

  it("shound return a not found error when repo.findOne returns null", async () => {
    // given
    const sut = makeLoginUseCase(clientRepo);
    const dto = {
      email: "invalid@email.com",
      password: "any-password",
    };
    const expectedError = new NotFoundError(
      `user with email=${dto.email} not found`
    );
    jest.spyOn(clientRepo, "findOne").mockResolvedValueOnce(null);

    //when
    const useCaseResult = await sut(dto);

    // then
    expect(useCaseResult).toEqual(expectedError);
  });

  it("should return a valid auth token", async () => {
    // given
    const sut = makeLoginUseCase(clientRepo);
    const password = await encrypt("valid-password");
    const user: IClient = {
      address: "valid-address",
      avatar: "valid-avatar",
      cpf: "valid-cpf",
      dateOfBirth: new Date(),
      email: "valid@email.com",
      password,
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      id: "any-uuid",
      type: "TUTOR",
    };
    const dto = {
      email: "valid@email.com",
      password: "valid-password",
    };
    jest.spyOn(clientRepo, "findOne").mockResolvedValueOnce(user);

    // when
    const useCaseResult = await sut(dto);

    // then
    expect((useCaseResult as TAuthenticatedClientInfo).token).toBeDefined();
  });

  it("should return a validation error when password is invalid", async () => {
    // given
    const sut = makeLoginUseCase(clientRepo);
    const password = await encrypt("valid-password");
    const user: IClient = {
      address: "valid-address",
      avatar: "valid-avatar",
      cpf: "valid-cpf",
      dateOfBirth: new Date(),
      email: "valid@email.com",
      password,
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      id: "any-uuid",
      type: "TUTOR",
    };
    const dto = {
      email: "valid@email.com",
      password: "invalid-password",
    };
    jest.spyOn(clientRepo, "findOne").mockResolvedValueOnce(user);
    const expectedError = new ValidationError("Invalid password");

    // when
    const useCaseResult = await sut(dto);

    // then
    expect(useCaseResult).toEqual(expectedError);
  });
});
