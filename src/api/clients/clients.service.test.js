import { createInstace } from "./clients.service";

const mockDatabaseClient = {
  create: jest.fn(),
  findUnique: jest.fn(),
};

const ClientsService = createInstace(mockDatabaseClient);

describe("ClientsService.register", () => {
  it("should call DatabaseClient.create", async () => {
    const spy = jest.spyOn(mockDatabaseClient, "create");
    const dto = {
      type: "TUTOR",
      address: "fake-address",
      avatar: "fake-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date("12-11-1996"),
      email: "test@email.com",
      firstName: "Fake",
      lastName: "User",
      password: "fake-password",
    };
    await ClientsService.register(dto);

    expect(spy).toBeCalled();
  });

  it("should return a user created by database client", async () => {
    const expectedUserDTO = {
      type: "TUTOR",
      address: "fake-address",
      avatar: "fake-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date("12-11-1996"),
      email: "test@email.com",
      firstName: "Fake",
      lastName: "User",
      password: "fake-password",
    };
    jest
      .spyOn(mockDatabaseClient, "create")
      .mockImplementationOnce(() => expectedUserDTO);
    const returnedUser = await ClientsService.register(expectedUserDTO);

    expect(returnedUser).toStrictEqual(expectedUserDTO);
  });
});
