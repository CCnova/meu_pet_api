import { Maybe, TModelValidations, ValidationError } from "@meu-pet/types";

export function modelValidate<EntityType>(
  params: EntityType,
  validations: Partial<TModelValidations<EntityType>>
): Maybe<ValidationError> {
  let validationError: Maybe<ValidationError> = null;
  Object.keys(validations).forEach((paramKey) => {
    const param = paramKey as keyof EntityType;
    const validationRun = validations[param]?.(params[param]);

    if (!validationRun?.isValid && validationRun?.error)
      validationError = validationRun.error;
  });

  return validationError;
}
