import * as crypto from "crypto";
import { IClient } from "../types";

export function makeClient(): IClient {
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
