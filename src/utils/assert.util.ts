import { string } from "fp-ts";
import { ValidationError } from "../types/errors.types";

export function isString(
  value: unknown,
  message: string
): asserts value is string {
  if (!string.isString(value)) throw new ValidationError(message);
}
