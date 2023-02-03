import { Maybe } from "../../types";
import { ValidationError } from "../../types/errors.types";
import { guard } from "../../utils";
import { MIN_PASSWORD_LENGTH } from "../client/constants";
import { IClient } from "../types/client.types";

export type TCreateClientParams = Omit<IClient, "id">;

export type TValidations = {
  [field in keyof TCreateClientParams]: (value: any) => TValidationResult;
};

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
  const isEmail = guard.isEmail(email);

  return {
    isValid: isEmail,
    error: isEmail ? null : new ValidationError("email is invalid"),
  };
}

function isValidAddress(address: string): TValidationResult {
  const isString = guard.isString(address);

  return {
    isValid: isString,
    error: isString ? null : new ValidationError("address is invalid"),
  };
}

function isValidFirstName(firstName: string): TValidationResult {
  const isValid = guard.isString(firstName) && guard.isMinLength(firstName, 2);

  return {
    isValid,
    error: isValid ? null : new ValidationError("name is invalid"),
  };
}

function isValidLastName(lastName: string): TValidationResult {
  const isValid = guard.isString(lastName) && guard.isMinLength(lastName, 2);

  return {
    isValid,
    error: isValid ? null : new ValidationError("name is invalid"),
  };
}

function isValidCpf(cpf: string): TValidationResult {
  const isValid = guard.isValidCpf(cpf);
  return {
    isValid,
    error: isValid ? null : new ValidationError("cpf is invalid"),
  };
}
function isValidDateOfBirth(dob: Date): TValidationResult {
  const month = dob.getUTCMonth() + 1; // Javascript months starts at 0 (January = 0, February = 1, ...);
  const day = dob.getUTCDate();
  const year = dob.getUTCFullYear();
  const isValid = new Date(year + 18, month - 1, day) <= new Date();

  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
  };
}

// Todo(CCnova): Implement
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function isValidAvatar(avatar: string): TValidationResult;

function validate(params: TCreateClientParams) {
  const validations: Partial<TValidations> = {
    password: isValidPassword,
    email: isValidEmail,
    address: isValidAddress,
    firstName: isValidFirstName,
    lastName: isValidLastName,
    cpf: isValidCpf,
    dateOfBirth: isValidDateOfBirth,
  };

  let validationError: Maybe<ValidationError> = null;
  Object.keys(validations).forEach((paramKey) => {
    const param = paramKey as keyof TCreateClientParams;
    const validationRun = validations[param]?.(params[param]);

    if (!validationRun?.isValid && validationRun?.error)
      validationError = validationRun.error;
  });

  return validationError;
}

export default function makeClientModel(idGenerator: TIdGenerator) {
  return {
    isValidAddress,
    isValidCpf,
    isValidDateOfBirth,
    isValidEmail,
    isValidFirstName,
    isValidLastName,
    isValidPassword,
    validate,
    createClient(params: TCreateClientParams): IClient | ValidationError {
      const validationError: Maybe<ValidationError> = this.validate(params);

      return validationError
        ? validationError
        : { id: idGenerator.generate(), ...params };
    },
  };
}
