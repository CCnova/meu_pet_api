import { Maybe } from "../../types";
import { ValidationError } from "../../types/errors.types";
import { TModelValidations } from "../../types/validations.types";

export function modelValidate<EntityType>(
  params: EntityType,
  validations: Partial<TModelValidations<EntityType>>
) {
  let validationError: Maybe<ValidationError> = null;
  Object.keys(validations).forEach((paramKey) => {
    const param = paramKey as keyof EntityType;
    const validationRun = validations[param]?.(params[param]);

    if (!validationRun?.isValid && validationRun?.error)
      validationError = validationRun.error;
  });

  return validationError;
}
