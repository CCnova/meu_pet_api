import { ProviderModel } from "@meu-pet/models";
import {
  EUserType,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "@meu-pet/types";
import { TEncryptionCompareFn } from "@meu-pet/utils";
import { TAuthTokenGenerator } from "@meu-pet/utils/authentication.utils";
import {
  IProviderDatabase,
  TLoginDTO,
  TLoginResult,
  TLoginUseCase,
} from "../contracts";

export default function makeLoginUseCase(dependencies: {
  providerRepository: IProviderDatabase;
  encryptionCompareFn: TEncryptionCompareFn;
  authenticationTokenGeneratorFn: TAuthTokenGenerator;
}): TLoginUseCase {
  return async function (dto: TLoginDTO): Promise<TLoginResult> {
    try {
      const dtoValidations = {
        email: ProviderModel.isValidEmail,
        password: ProviderModel.isValidPassword,
      };
      const validationError = ProviderModel.validate(dto, dtoValidations);
      if (validationError)
        return Promise.resolve(
          new ValidationError("Invalid email or password")
        );

      const user = await dependencies.providerRepository.findOne({
        email: dto.email,
      });
      if (!user) return new NotFoundError(`Invalid email or password`);

      const passwordValid = await dependencies.encryptionCompareFn(
        dto.password,
        user.password
      );
      if (!passwordValid)
        return new ValidationError("Invalid email or password");

      const payload = {
        id: user.id,
        email: user.email,
        type: EUserType.PROVIDER,
      };
      // Todo(CCnova): This expiration value should be in a constants file
      const token = dependencies.authenticationTokenGeneratorFn(
        { payload },
        "1h"
      );

      const { password: _, ...publicUserData } = user; // We don't want to expose the password

      return { user: publicUserData, token };
    } catch (error: any) {
      return new InternalServerError(error.message);
    }
  };
}
