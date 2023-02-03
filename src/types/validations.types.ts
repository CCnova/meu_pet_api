import { ValidationError } from "./errors.types";
import { Maybe } from "./util.types";

export type TValidationResult = {
  isValid: boolean;
  error: Maybe<ValidationError>;
};

export type TModelValidations<CreateModelParamsType> = {
  [field in keyof CreateModelParamsType]: (value: any) => TValidationResult;
};
