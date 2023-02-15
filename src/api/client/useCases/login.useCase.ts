import { NotFoundError, ValidationError } from "../../../types/errors.types";
import { compare } from "../../../utils";
import { ClientModel } from "../../models";
import { generateToken } from "../../utils";
import { IClientDatabase, TLoginUseCase } from "../contracts";

export default function makeLoginUseCase(
  clientRepo: IClientDatabase
): TLoginUseCase {
  return async (dto) => {
    const dtoValidations = {
      email: ClientModel.isValidEmail,
      password: ClientModel.isValidPassword,
    };
    const validationError = ClientModel.validate(dto, dtoValidations);
    if (validationError) return Promise.resolve(validationError);

    const user = await clientRepo.findOne({ email: dto.email });
    if (!user)
      return new NotFoundError(`user with email=${dto.email} not found`);

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) return new ValidationError("Invalid password");

    const token = generateToken(user, "1h");

    const { password: _, ...publicUserData } = user;

    return { user: publicUserData, token };
  };
}
