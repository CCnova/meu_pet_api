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
  const month = dob.getUTCMonth() + 1; // Javascript months starts at 0 (January = 0, February = 1, ...);
  const day = dob.getUTCDate();
  const year = dob.getUTCFullYear();
  const isValid = new Date(year + 18, month - 1, day) <= new Date();

  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
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
  };

  return {
    isValidDateOfBirth,
    isValidFirstName,
    isValidLastName,
    isValidPassword,
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
