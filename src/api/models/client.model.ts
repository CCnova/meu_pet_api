import validator from "validator";
import { Maybe } from "../../types";
import { ValidationError } from "../../types/errors.types";
import { MIN_PASSWORD_LENGTH } from "../clients/constants";
import { IClient } from "../types/client.types";

export type TCreateClientParams = Omit<IClient, "id">;

export type TValidationResult = {
  isValid: boolean;
  error: Maybe<ValidationError>;
};

export type TIdGenerator = { generate: () => string };

function isValidPassword(password: string): TValidationResult {
  const satisfiesLength = password.length >= MIN_PASSWORD_LENGTH;
  return {
    isValid: satisfiesLength,
    error: satisfiesLength
      ? null
      : new ValidationError(
          `password must be at minimum length = ${MIN_PASSWORD_LENGTH}`
        ),
  };
}

function isValidEmail(email: string): TValidationResult {
  const isEmail = validator.isEmail(email);

  return {
    isValid: isEmail,
    error: isEmail ? null : new ValidationError("email is invalid"),
  };
}

export default function makeClientModel(idGenerator: TIdGenerator) {
  return {
    isValidPassword,
    isValidEmail,
    createClient(params: TCreateClientParams): IClient | ValidationError {
      // Todo(CCnova): Add business rules validations
      return { id: idGenerator.generate(), ...params };
    },
  };
}
