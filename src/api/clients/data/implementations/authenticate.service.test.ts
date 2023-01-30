import { AuthenticateService } from ".";
import * as utils from "../../../../utils";
import { IFindClientsDatabaseClient } from "../../infra/contracts";
import { AuthenticationError } from "../../models";

jest.mock("../../../../utils", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../../../utils"),
  };
});

describe("AuthenticateClientService", () => {
  const mockDatabaseClient: IFindClientsDatabaseClient = {
    findOne: jest.fn(),
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call client.findOne with the correct email", async () => {
    const sut = AuthenticateService.createInstance(mockDatabaseClient);
    const spy = jest.spyOn(mockDatabaseClient, "findOne");
    const email = "fake@email.com";
    const dto = {
      email,
      password: "any-password",
    };

    await sut.execute(dto);

    expect(spy).toHaveBeenCalledWith({ email });
  });

  it("should return AuthenticationError when client.findOne returns null", async () => {
    // given
    const sut = AuthenticateService.createInstance(mockDatabaseClient);
    const dto = {
      email: "fake@email.com",
      password: "any-password",
    };

    // when
    const result = await sut.execute(dto);

    // then
    expect(result).toEqual(new AuthenticationError());
  });

  it("should return AuthenticationError when password is incorrect", async () => {
    // given
    const sut = AuthenticateService.createInstance(mockDatabaseClient);
    const dto = {
      email: "fake@email.com",
      password: "any-password",
    };
    jest.spyOn(utils, "compare").mockResolvedValueOnce(false);
    jest.spyOn(mockDatabaseClient, "findOne").mockResolvedValueOnce({
      email: dto.email,
      password: dto.password,
      address: "fake-address",
      avatar: "fake-avatar",
      cpf: "fake-cpf",
      dateOfBirth: new Date(),
      firstName: "fake",
      lastName: "user",
      id: -1,
      type: "TUTOR",
    });

    // when
    const result = await sut.execute(dto);

    // then
    expect(result).toEqual(new AuthenticationError());
  });

  it("should return the correct user", async () => {
    // given
    const sut = AuthenticateService.createInstance(mockDatabaseClient);
    const mockUser: IFindClientsDatabaseClient.TFindOneResult = {
      email: "fake@email.com",
      password: "any-password",
      address: "fake-address",
      avatar: "fake-avatar",
      cpf: "fake-cpf",
      dateOfBirth: new Date(),
      firstName: "fake",
      lastName: "user",
      id: -1,
      type: "TUTOR",
    };
    const dto = {
      email: mockUser.email,
      password: mockUser.password,
    };
    jest.spyOn(utils, "compare").mockResolvedValueOnce(true);
    jest.spyOn(mockDatabaseClient, "findOne").mockResolvedValueOnce(mockUser);

    // when
    const result = await sut.execute(dto);

    // then
    expect(result).toEqual(mockUser);
  });
});
