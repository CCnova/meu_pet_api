import { guard } from ".";
import { ValidationError } from "../types/errors.types";

export function isString(
  value: unknown,
  message: string
): asserts value is string {
  if (!guard.isString(value)) throw new ValidationError(message);
}

export function isMinLength(
  value: unknown,
  length: number,
  message: string
): asserts value is string | Array<unknown> {
  if (!guard.isMinLength(value, length)) throw new ValidationError(message);
}

export function isDate(value: unknown, message: string): asserts value is Date {
  if (!guard.isDate(value)) throw new ValidationError(message);
}

export function isOneOf<V>(value: V, values: V[], errorMessage: string) {
  if (!guard.isOneOf(value, values)) throw new ValidationError(errorMessage);
}

export function isDefined<T = unknown>(
  value: T,
  errorMessage: string
): asserts value is NonNullable<T> {
  if (!guard.isDefined(value)) throw new ValidationError(errorMessage);
}
