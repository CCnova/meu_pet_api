import { mock } from "jest-mock-extended";
import * as ClientModel from "./client.model";
import { IClientDatabase } from "./contracts";

describe("ClientModel", () => {
  const clientDatabase = mock<IClientDatabase>();

  it("should create a Client", async () => {
    // given
    const insertData: Omit<ClientModel.IClient, "id"> = {
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
    const mockUser: ClientModel.IClient = {
      id: 1,
      ...insertData,
    };
    jest.spyOn(clientDatabase, "insert").mockResolvedValueOnce(mockUser);

    // when
    const result = await ClientModel.createClient(clientDatabase, insertData);

    // then
    expect(result).toEqual(mockUser);
  });
});
