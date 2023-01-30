import { assert } from "../../../../utils";
import { IRegisterClientUserController } from "../contracts";

export function validateRegisterBody(
  body: IRegisterClientUserController.TRegisterRequestBody
) {
  // Todo(CNova): Finish adding all validations to the necessary fields
  assert.isString(body.address, "address must be a string");
}
