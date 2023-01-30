import { RegisterService } from ".";
import * as utils from "../../../../utils";
import { IRegisterClientService } from "../contracts";

jest.mock("../../../../utils", () => ({
  __esModule: true,
  ...jest.requireActual("../../../../utils"),
}));

describe("RegisterClientService", () => {
  const mockDatabaseClient = {
    insertOne: jest.fn(),
  };

  it("should call client.insertOne with the correct arguments", async () => {
    // given
    const sut = RegisterService.createInstance(mockDatabaseClient);
    const dto: IRegisterClientService.TRegisterClientUserDTO = {
      email: "fake@email.com",
      password: "123456",
      address: "any-address",
      avatar: "any-avatar",
      cpf: "any-cpf",
      dateOfBirth: new Date(),
      firstName: "Any-name",
      lastName: "Any-name",
      type: "TUTOR",
    };
    jest
      .spyOn(mockDatabaseClient, "insertOne")
      .mockResolvedValueOnce({ id: -1, ...dto });
    jest.spyOn(utils, "encrypt").mockResolvedValueOnce(dto.password);

    // when
    const result = await sut.execute(dto);

    // then
    expect(result).toEqual({ id: -1, ...dto });
  });
});
