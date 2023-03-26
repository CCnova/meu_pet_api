import { mock } from "jest-mock-extended";
import { IClient } from "../client/types";
import { IIdGenerator } from "../contracts/models.contracts";
import { ValidationError } from "../types/errors.types";
import { guard } from "../utils";
import makeClientModel, {
  MIN_PASSWORD_LENGTH,
  TCreateClientParams,
} from "./client.model";

jest.mock("../utils/guard.utils.ts", () => ({
  __esModule: true,
  ...jest.requireActual("../utils/guard.utils.ts"),
}));

describe("ClientModel", () => {
  const idGenerator = mock<IIdGenerator>();
  jest.spyOn(guard, "isValidCpf").mockReturnValue(true);

  it("createClient should create a Client", () => {
    // given
    const sut = makeClientModel(idGenerator);
    const insertData: TCreateClientParams = {
      address: "valid-address",
      avatar: "valid-avatar",
      cpf: "valid-cpf",
      dateOfBirth: "12-11-1996",
      email: "valid@email.com",
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      password: "valid-password",
      type: "TUTOR",
    };
    const id = "random-id";
    jest.spyOn(idGenerator, "generate").mockReturnValueOnce(id);
    const mockUser: IClient = {
      ...insertData,
      id,
      dateOfBirth: new Date(insertData.dateOfBirth),
    };

    // when
    const result = sut.createClient(insertData);

    // then
    expect(result).toEqual(mockUser);
  });

  it("isValidPassword should return the correct validation result for a valid password", () => {
    // given
    const sut = makeClientModel(idGenerator);
    const validPassword = "123456";

    // when
    const validResult = sut.isValidPassword(validPassword);

    // then
    expect(validResult.isValid).toBe(true);
    expect(validResult.error).toBeNull();
  });

  it("isValidPassword should return the correct validation result for a invalid password", () => {
    // given
    const sut = makeClientModel(idGenerator);
    const invalidPassword = "12345";

    // when
    const invalidResult = sut.isValidPassword(invalidPassword);

    // then
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.error).toEqual(
      new ValidationError(
        `password must be at minimum length = ${MIN_PASSWORD_LENGTH}`
      )
    );
  });

  it("isValidEmail should return the correct validation result for a valid email", () => {
    // given
    const sut = makeClientModel(idGenerator);
    const validEmail = "valid@email.com";

    // when
    const validResult = sut.isValidEmail(validEmail);

    // then
    expect(validResult.isValid).toBe(true);
    expect(validResult.error).toBeNull();
  });

  it("isValidEmail should return the correct validation result for a invalid email", () => {
    // given
    const sut = makeClientModel(idGenerator);
    const invalidEmail = "invalidemail.com";

    // when
    const invalidResult = sut.isValidEmail(invalidEmail);

    // then
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.error).toEqual(
      new ValidationError(`email is invalid`)
    );
  });
});
