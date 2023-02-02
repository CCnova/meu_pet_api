import { mock } from "jest-mock-extended";
import { ValidationError } from "../../types/errors.types";
import { MIN_PASSWORD_LENGTH } from "../client/constants";
import { IClient } from "../types/client.types";
import makeClientModel, {
  TCreateClientParams,
  TIdGenerator,
} from "./client.model";

describe("ClientModel", () => {
  const idGenerator = mock<TIdGenerator>();

  it("createClient should create a Client", async () => {
    // given
    const sut = makeClientModel(idGenerator);
    const insertData: TCreateClientParams = {
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date("12-11-1996"),
      email: "any@email.com",
      firstName: "any-first-name",
      lastName: "any-last-name",
      password: "any-password",
      type: "TUTOR",
    };
    const id = "random-id";
    jest.spyOn(idGenerator, "generate").mockReturnValueOnce(id);
    const mockUser: IClient = {
      id,
      ...insertData,
    };

    // when
    const result = await sut.createClient(insertData);

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
