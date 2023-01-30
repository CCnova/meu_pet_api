import { EErrorMessages } from "../../../types";

export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message ?? EErrorMessages.AuthenticationError);
  }
}

export class RegisterError extends Error {
  constructor(message?: string) {
    super(message ?? EErrorMessages.RegisterUserError);
  }
}
