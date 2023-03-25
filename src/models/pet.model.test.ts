import { mock } from "jest-mock-extended";
import { IIdGenerator } from "../contracts/models.contracts";
import { ValidationError } from "../types/errors.types";
import makePetModel, { TCreatePetParams } from "./pet.model";

describe("PetModel", () => {
  const idGenerator = mock<IIdGenerator>();

  it("createPet should create a Pet when every param is valid", () => {
    // given
    const sut = makePetModel(idGenerator);
    const params: TCreatePetParams = {
      name: "valid-name",
      breed: "valid-breed",
      dateOfBirth: new Date("01/01/2000"),
    };
    const id = "random-id";
    jest.spyOn(idGenerator, "generate").mockReturnValueOnce(id);
    const expectedResult = {
      id,
      ...params,
    };

    // when
    const result = sut.createPet(params);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("createPet should return a validationError when validate returns a error", () => {
    // given
    const sut = makePetModel(idGenerator);
    const invalidParams: any = {};
    const expectedError = new ValidationError("some param is missing");
    jest.spyOn(sut, "validate").mockReturnValueOnce(expectedError);

    // when
    const result = sut.createPet(invalidParams);

    // then
    expect(result).toEqual(expectedError);
  });
});
