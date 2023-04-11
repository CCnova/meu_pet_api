import { createMUserPets } from "@meu-pet/factories";
import { IPetDatabase } from "@meu-pet/pet/contracts";
import * as crypto from "crypto";
import { mock } from "jest-mock-extended";
import makeListUserPetsUseCase from "./listUserPets.useCase";

describe("ListUserPetsUseCase", () => {
  const petRepository = mock<IPetDatabase>();

  it("should return list of pets when repository returns", async () => {
    // given
    const sut = makeListUserPetsUseCase({ petRepository });
    const expectedNumberOfPets = 5;
    const expectedOwnerId = crypto.randomUUID();
    const expectedPets = createMUserPets(expectedNumberOfPets, expectedOwnerId);
    petRepository.list.mockResolvedValueOnce(expectedPets);

    // when
    const result = await sut({ userId: expectedOwnerId });

    // then
    expect(result).toEqual(expectedPets);
  });
});
