import { assert } from "../../../../utils";
import { IAuthenticateClientUserController } from "../contracts";

export function validateAuthenticateBody(
  body: IAuthenticateClientUserController.TAuthenticateRequestBody
) {
  assert.isString(body.email, "email must be a string!");
  assert.isString(body.password, "password must be a string");
}
