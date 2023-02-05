import { ValidationError } from "../../types/errors.types";
import { TModelValidations } from "../../types/validations.types";
import { IIdGenerator } from "../contracts/models.contracts";
import { IPet } from "../types";
import { modelValidate } from "../utils";

export type TCreatePetParams = Omit<IPet, "id" | "ownerId">;
export type TCreatePetResult = Omit<IPet, "ownerId"> | ValidationError;

const validations: Partial<TModelValidations<TCreatePetParams>> = {};

export default function makePetModel(idGenerator: IIdGenerator) {
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
