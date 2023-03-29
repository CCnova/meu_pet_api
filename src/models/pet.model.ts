import { IPet } from "@meu-pet/pet/types";
import { validationUtils } from "@meu-pet/utils";
import { IIdGenerator } from "../contracts/models.contracts";
import { ValidationError } from "../types/errors.types";
import {
  TModelValidations,
  TValidationResult,
} from "../types/validations.types";
import { guard } from "../utils";

function isValidName(name: string): TValidationResult {
  const isValid = guard.isString(name) && guard.isMinLength(name, 1);

  return {
    isValid,
    error: isValid ? null : new ValidationError("name is invalid"),
  };
}

function isValidBreed(breed: string): TValidationResult {
  const isValid = guard.isString(breed) && guard.isMinLength(breed, 1);

  return {
    isValid,
    error: isValid ? null : new ValidationError("breed is invalid"),
  };
}

// Todo(CCnova): Make this re-usable
function isValidDateOfBirth(dob: string): TValidationResult {
  const dobDate = new Date(dob);
  const month = dobDate.getUTCMonth() + 1; // Javascript months starts at 0 (January = 0, February = 1, ...);
  const day = dobDate.getUTCDate();
  const year = dobDate.getUTCFullYear();
  const isValid = new Date(year, month + 3, day) <= new Date();
  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
  };
}

export type TCreatePetParams = Omit<IPet, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
};
export type TCreatePetResult = IPet | ValidationError;

export default function makePetModel(idGenerator: IIdGenerator) {
  const validations: Partial<TModelValidations<TCreatePetParams>> = {
    name: isValidName,
    breed: isValidBreed,
    dateOfBirth: isValidDateOfBirth,
  };

  return {
    validate: validationUtils.modelValidate<TCreatePetParams>,
    createPet(params: TCreatePetParams): TCreatePetResult {
      const validationError = this.validate(params, validations);

      return validationError
        ? validationError
        : {
            ...params,
            id: idGenerator.generate(),
            dateOfBirth: new Date(params.dateOfBirth),
          };
    },
  };
}
