import { IProvider } from "@meu-pet/provider";
import { TRegisterProviderDTO } from "@meu-pet/provider/contracts/useCases.contracts";
import * as crypto from "crypto";

export function createMRegisterProviderDTO(): TRegisterProviderDTO {
  return {
    avatar: "valid-avatar",
    dateOfBirth: "01/01/1990",
    email: "valid@email.com",
    firstName: "valid-first-name",
    lastName: "valid-last-name",
    password: "123456",
  };
}

export function createMProvider(): IProvider {
  return {
    id: crypto.randomUUID(),
    avatar: "fake-avatar",
    dateOfBirth: new Date("01/01/1990"),
    email: "fake@email",
    firstName: "fake-first-name",
    lastName: "fake-last-name",
    password: "123456",
  };
}
