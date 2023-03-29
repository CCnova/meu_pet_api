import { validationUtils } from "@meu-pet/utils";
import { ClientUserType } from "@prisma/client";
import { IClient } from "../client/types";
import { IIdGenerator } from "../contracts/models.contracts";
import { Maybe } from "../types";
import { ValidationError } from "../types/errors.types";
import {
  TModelValidations,
  TValidationResult,
} from "../types/validations.types";
import { guard } from "../utils";

export const MIN_PASSWORD_LENGTH = 6;
export const MIN_CLIENT_USER_AGE = 18;

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
  const isValid = guard.isAgeBelow(dob, 18);

  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
  };
}

function isValidType(type: string): TValidationResult {
  const isValid = guard.isOneOf(type, Object.values(ClientUserType));

  return {
    isValid,
    error: isValid ? null : new ValidationError("type is invalid"),
  };
}

// Todo(CCnova): Implement
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function isValidAvatar(avatar: string): TValidationResult;

export type TCreateClientParams = Omit<IClient, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
};
export type TCreateClientResult = IClient | ValidationError;

export default function makeClientModel(idGenerator: IIdGenerator) {
  const validations: Partial<TModelValidations<TCreateClientParams>> = {
    password: isValidPassword,
    email: isValidEmail,
    address: isValidAddress,
    firstName: isValidFirstName,
    lastName: isValidLastName,
    cpf: isValidCpf,
    dateOfBirth: isValidDateOfBirth,
    type: isValidType,
  };
  return {
    isValidAddress,
    isValidCpf,
    isValidDateOfBirth,
    isValidEmail,
    isValidFirstName,
    isValidLastName,
    isValidPassword,
    validate: validationUtils.modelValidate<Partial<IClient>>,
    createClient(params: TCreateClientParams): TCreateClientResult {
      const clientData: IClient = {
        ...params,
        dateOfBirth: new Date(params.dateOfBirth),
        id: idGenerator.generate(),
      };
      const validationError: Maybe<ValidationError> = this.validate(
        clientData,
        validations
      );

      return validationError ? validationError : clientData;
    },
  };
}
