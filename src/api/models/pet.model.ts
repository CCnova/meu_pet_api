import { ValidationError } from "../../types/errors.types";
import {
  TModelValidations,
  TValidationResult,
} from "../../types/validations.types";
import { guard } from "../../utils";
import { IIdGenerator } from "../contracts/models.contracts";
import { IPet } from "../types";
import { modelValidate } from "../utils";

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
function isValidDateOfBirth(dob: Date): TValidationResult {
  const month = dob.getUTCMonth() + 1; // Javascript months starts at 0 (January = 0, February = 1, ...);
  const day = dob.getUTCDate();
  const year = dob.getUTCFullYear();
  const isValid = new Date(year, month + 3, day) <= new Date();

  return {
    isValid,
    error: isValid ? null : new ValidationError("dateOfBirth is invalid"),
  };
}

export type TCreatePetParams = Omit<IPet, "id" | "ownerId">;
export type TCreatePetResult = Omit<IPet, "ownerId"> | ValidationError;

export default function makePetModel(idGenerator: IIdGenerator) {
  const validations: Partial<TModelValidations<TCreatePetParams>> = {
    name: isValidName,
    breed: isValidBreed,
    dateOfBirth: isValidDateOfBirth,
  };

  return {
    validate: modelValidate<TCreatePetParams>,
    createPet(params: TCreatePetParams): TCreatePetResult {
      const validationError = this.validate(params, validations);

      return validationError
        ? validationError
        : { id: idGenerator.generate(), ...params };
    },
  };
}
