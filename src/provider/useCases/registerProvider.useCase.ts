import { ProviderModel } from "@meu-pet/models";
import { InternalServerError, ValidationError } from "@meu-pet/types";
import { encrypt, logger } from "@meu-pet/utils";
import { IProviderDatabase } from "../contracts";
import { TRegisterProviderUseCase } from "../contracts/useCases.contracts";

export default function makeRegisterProviderUseCase(params: {
  providerRepo: IProviderDatabase;
}): TRegisterProviderUseCase {
  return async function (dto) {
    const createProviderResult = ProviderModel.createProvider(dto);
    if (createProviderResult instanceof ValidationError)
      return Promise.resolve(createProviderResult);

    const encryptedPassword = await encrypt(createProviderResult.password);

    return params.providerRepo
      .insert({ ...createProviderResult, password: encryptedPassword })
      .catch((error) => {
        logger.log.error(
          `An unknown error has occurred while trying to create provider error=${error.message}`
        );

        return new InternalServerError(
          `An unknown error has occurred while trying to register new provider user. If this persist, please contact support`
        );
      });
  };
}
