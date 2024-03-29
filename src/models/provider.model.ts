import { IIdGenerator } from "@meu-pet/contracts";
import { IProvider } from "@meu-pet/provider";
import {
  Maybe,
  TModelValidations,
  TValidationResult,
  ValidationError,
} from "@meu-pet/types";
import { guard, validationUtils } from "@meu-pet/utils";

export const MIN_PASSWORD_LENGTH = 6;

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

function isValidDateOfBirth(dob: Date): TValidationResult {
  const isValid = guard.isAgeBelow(dob, 18);

  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
  };
}

function isValidEmail(email: string): TValidationResult {
  const isEmail = guard.isEmail(email);

  return {
    isValid: isEmail,
    error: isEmail ? null : new ValidationError("email is invalid"),
  };
}

export type TCreateProviderParams = Omit<IProvider, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
};
export type TCreateProviderResult = IProvider | ValidationError;

export default function makeProviderModel(idGenerator: IIdGenerator) {
  const validations: Partial<TModelValidations<TCreateProviderParams>> = {
    dateOfBirth: isValidDateOfBirth,
    firstName: isValidFirstName,
    lastName: isValidLastName,
    password: isValidPassword,
    email: isValidEmail,
  };

  return {
    isValidDateOfBirth,
    isValidFirstName,
    isValidLastName,
    isValidPassword,
    isValidEmail,
    validate: validationUtils.modelValidate<Partial<IProvider>>,
    createProvider(params: TCreateProviderParams) {
      const providerData: IProvider = {
        ...params,
        id: idGenerator.generate(),
        dateOfBirth: new Date(params.dateOfBirth),
      };
      const validationError: Maybe<ValidationError> = this.validate(
        providerData,
        validations
      );

      return validationError ? validationError : providerData;
    },
  };
}
