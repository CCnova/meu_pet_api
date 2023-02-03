import { mock } from "jest-mock-extended";
import { IIdGenerator } from "../contracts/models.contracts";
import makePetModel, { TCreatePetParams } from "./pet.model";

describe("PetModel", () => {
  const idGenerator = mock<IIdGenerator>();

  it("createPet should create a Pet when every param is valid", () => {
    // given
    const sut = makePetModel(idGenerator);
    const params: TCreatePetParams = {
      name: "valid-name",
      breed: "valid-breed",
      dateOfBirth: new Date(),
      ownerId: "valid-owner-id",
    };
    const id = "random-id";
    jest.spyOn(idGenerator, "generate").mockReturnValue(id);
    const expectedResult = {
      id,
      ...params,
    };

    // when
    const result = sut.createPet(params);

    // then
    expect(result).toEqual(expectedResult);
  });
});
