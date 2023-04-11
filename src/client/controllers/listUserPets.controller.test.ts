import { createMUserPets } from "@meu-pet/factories";
import { EStatusCode, ValidationError } from "@meu-pet/types";
import * as crypto from "crypto";
import { TListUserPetsRequest } from "../contracts/controllers.contracts";
import makeListUserPetsController from "./listUserPets.controller";

describe("ListUserPetsController", () => {
  const listUserPets = jest.fn();
  const userId = crypto.randomUUID();

  it("should return validationError when userId is of wrong type", async () => {
    // given
    const sut = makeListUserPetsController(listUserPets);
    const expectedError = new ValidationError("userId must be a string");
    const listUserPetsRequest: TListUserPetsRequest = {
      body: { userId: 1 as any },
      params: {},
      query: {},
    };

    // when
    const result = await sut(listUserPetsRequest);

    // then
    expect(result).toEqual({
      statusCode: EStatusCode.UnprocessableEntity,
      body: { error: expectedError },
    });
  });

  it("should return the correct array of pets when useCase returns", async () => {
    // given
    const sut = makeListUserPetsController(listUserPets);
    const expectedPetsQuantity = 5;
    const expectedPets = createMUserPets(expectedPetsQuantity, userId);
    const expectedResponse = {
      statusCode: EStatusCode.OK,
      body: {
        data: expectedPets,
      },
    };
    const listUserPetsRequest: TListUserPetsRequest = {
      body: { userId },
      params: {},
      query: {},
    };
    listUserPets.mockResolvedValueOnce(expectedPets);

    // when
    const result = await sut(listUserPetsRequest);

    // then
    expect(result).toEqual(expectedResponse);
  });
});
