import { assert } from "../../utils";
import {
  TAuthenticateClientUserRequest,
  TRegisterClientUserRequest,
} from "./clients.controller";

export function validateRegisterBody(body: TRegisterClientUserRequest) {
  // Todo(CNova): Finish adding all validations to the necessary fields
  assert.isString(body.address, "address must be a string");
}

export function validateAuthenticateBody(body: TAuthenticateClientUserRequest) {
  assert.isString(body.email, "email must be a string!");
  assert.isString(body.password, "password must be a string");
}
