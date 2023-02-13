import { ValidationError } from "./errors.types";
import { Maybe } from "./util.types";

export type TValidationResult = {
  isValid: boolean;
  error: Maybe<ValidationError>;
};

export type TModelValidations<ModelParamsType> = {
  [field in keyof ModelParamsType]: (value: any) => TValidationResult;
};
