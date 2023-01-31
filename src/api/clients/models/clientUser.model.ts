import { ClientUser } from "@prisma/client";
import validator from "validator";
import { assert } from "../../../utils";

export interface IClientUser extends ClientUser {}

export namespace IClientUser {
  export const MIN_PASSWORD_LENGTH = 6;
}

// Todo(CCnova): Implement unit tests
export const validations = {
  isValidPassword(password: string): boolean {
    assert.isMinLength(
      password,
      IClientUser.MIN_PASSWORD_LENGTH,
      "password must have length 6 at minimum"
    );

    return true;
  },
  isValidEmail(email: string): boolean {
    return validator.isEmail(email);
  },
};
