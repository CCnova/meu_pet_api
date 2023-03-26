import { IProvider } from "@meu-pet/provider";
import { ValidationError } from "@meu-pet/types";
import makeProviderModel, {
  MIN_PASSWORD_LENGTH,
  TCreateProviderParams,
} from "./provider.model";

describe("ProviderModel", () => {
  const idGenerator = {
    generate: () => "random-id",
  };

  it("should create a Provider", () => {
    // given
    const sut = makeProviderModel(idGenerator);
    const createParams: TCreateProviderParams = {
      avatar: "valid-avatar",
      dateOfBirth: "12/11/1996",
      email: "valid@email.com",
      firstName: "valid-first-name",
      lastName: "valid-last-name",
      password: "123456",
    };
    const expectedResult: IProvider = {
      ...createParams,
      id: "random-id",
      dateOfBirth: new Date(createParams.dateOfBirth),
    };

    // when
    const result = sut.createProvider(createParams);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("isValidPassword should return the correct validation result for a valid password", () => {
    // given
    const sut = makeProviderModel(idGenerator);
    const validPassword = "123456";

    // when
    const validResult = sut.isValidPassword(validPassword);

    // then
    expect(validResult.isValid).toBe(true);
    expect(validResult.error).toBeNull();
  });

  it("isValidPassword should return the correct validation result for a invalid password", () => {
    // given
    const sut = makeProviderModel(idGenerator);
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
});
