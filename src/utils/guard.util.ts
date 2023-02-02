import { isString as fpIsString } from "fp-ts/lib/string";
import validator from "validator";

export function isLengthable(value: any): boolean {
  return isString(value) || Array.isArray(value);
}

export function isMinLength(value: any, minLength: number): boolean {
  return isLengthable(value) && value.length >= minLength;
}

export function isString(value: any): boolean {
  return fpIsString(value);
}

export function isEmail(value: any): boolean {
  return isString(value) && validator.isEmail(value);
}

export function isValidCpf(value: any): boolean {
  if (!isString(value)) return false;
  value = value.replace(/[^\d]+/g, "");
  if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) return false;
  value = value.split("").map((el: string) => +el);
  const rest = (count: number) =>
    ((value
      .slice(0, count - 12)
      .reduce(
        (soma: number, el: number, index: number) =>
          soma + el * (count - index),
        0
      ) *
      10) %
      11) %
    10;
  return rest(10) === value[9] && rest(11) === value[10];
}
