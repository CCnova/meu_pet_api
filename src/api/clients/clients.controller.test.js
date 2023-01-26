import * as ClientsController from "./clients.controller";
import * as ClientsService from "./clients.service";

jest.mock("./clients.service.ts", () => {
  const mockUser = {
    id: -1,
    address: "fake-address",
    avatar: "fake-avatar",
    cpf: "12345678910",
    dateOfBirth: new Date(),
    email: "test@email.com",
    firstName: "Test",
    lastName: "Client user",
    password: "123456",
    type: "TUTOR",
  };

  return {
    register: jest.fn(() => Promise.resolve(mockUser)),
    authenticate: jest.fn(() => Promise.resolve(mockUser)),
  };
});

describe("ClientsController.register", () => {
  const mockResponse = { status: () => ({ send: (f) => f }) };

  it("should call ClientUserUseCases.register with the correct arguments", async () => {
    const body = {
      address: "fake-address",
      avatar: "fake-avatar",
      cpf: "12345678910",
      dateOfBirth: new Date(),
      email: "test@email.com",
      firstName: "Test",
      lastName: "Client user",
      password: "fake-password",
      type: "TUTOR",
    };
    const spy = jest
      .spyOn(ClientsService, "register")
      .mockImplementation((f) => Promise.resolve(f));
    await ClientsController.register({ body }, mockResponse);
    expect(spy).toBeCalledWith(body);
  });

  it("should throw validation error when body is invalid", async () => {
    // Todo(CNova): Need to test if it throws for every necessary field
    const body = "invalid-data";

    const registrationResponse = await ClientsController.register(
      { body },
      mockResponse
    );

    expect(registrationResponse.error).toBeDefined();
  });
});

describe("ClientsController.authenticate", () => {
  const mockResponse = { status: () => ({ send: (f) => f }) };

  it("should authenticate and return the user when information is right", async () => {
    const body = { email: "test@email.com", password: "fake-password" };

    const response = await ClientsController.authenticate(
      { body },
      mockResponse
    );

    expect(response.user.email).toBe(body.email);
  });

  it("should throw if email is of invalid type", async () => {
    const body = { email: -1, password: "fake-password" };

    const response = await ClientsController.authenticate(
      { body },
      mockResponse
    );

    expect(response.error).toBeDefined();
  });
});
