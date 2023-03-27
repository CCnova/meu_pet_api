import { IClient } from "@meu-pet/client";
import { TRegisterClientRequestBody } from "@meu-pet/client/contracts/controllers.contracts";
import * as crypto from "crypto";

export function makeMockClient(): IClient {
  return {
    address: "fake-address",
    avatar: "fake-avatar",
    cpf: "12345678910",
    dateOfBirth: new Date("01/01/1990"),
    email: "fake@email.com",
    firstName: "Fake",
    lastName: "Name",
    id: crypto.randomUUID(),
    password: "fake-password",
    type: "TUTOR",
  };
}

export function makeRegisterClientRequestBody(): TRegisterClientRequestBody {
  return {
    address: "fake-address",
    avatar: "fake-avatar",
    cpf: "12345678910",
    dateOfBirth: "01/01/1990",
    email: "fake@email.com",
    firstName: "Fake",
    lastName: "Name",
    password: "fake-password",
    type: "TUTOR",
    pets: [],
  };
}
