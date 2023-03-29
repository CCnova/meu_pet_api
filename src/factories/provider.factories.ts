import { IProvider, TAuthenticatedProviderInfo } from "@meu-pet/provider";
import { TLoginDTO, TRegisterProviderDTO } from "@meu-pet/provider/contracts";
import { TRegisterProviderRequestBody } from "@meu-pet/provider/contracts/controllers.contracts";
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

export function createMProvider(attrs?: Partial<IProvider>): IProvider {
  return {
    id: crypto.randomUUID(),
    avatar: "fake-avatar",
    dateOfBirth: new Date("01/01/1990"),
    email: "fake@email",
    firstName: "fake-first-name",
    lastName: "fake-last-name",
    password: "123456",
    ...attrs,
  };
}

export function createMRegisterProviderRequestBody(): TRegisterProviderRequestBody {
  return {
    avatar: "fake-avatar",
    dateOfBirth: "01/01/1990",
    email: "fake@email",
    firstName: "fake-first-name",
    lastName: "fake-last-name",
    password: "123456",
  };
}

export function createMLoginProviderDTO(): TLoginDTO {
  return {
    email: "valid@email.com",
    password: "123456",
  };
}

export function createMAuthenticatedProviderInfo(): TAuthenticatedProviderInfo {
  const { password: _, ...providerData } = createMProvider();

  return {
    user: providerData,
    token: "auth-token",
  };
}
