import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { ClientModel } from "../../models";
import { IClientDatabase } from "../contracts/data.contracts";
import {
  IRegisterUserUseCase,
  TRegisterClientUserDTO,
} from "../contracts/useCases.contracts";

export default function makeRegisterClientUseCase(
  clientRepo: IClientDatabase
): IRegisterUserUseCase {
  return {
    async execute(dto: TRegisterClientUserDTO) {
      const createClientResult = ClientModel.createClient(dto);
      if (createClientResult instanceof ValidationError)
        return createClientResult;

      try {
        const newClient = await clientRepo.insert(createClientResult);
        return newClient;
      } catch (error) {
        return new InternalServerError(
          `An unknown error has occurred while trying to register new client user with dto=${dto}`
        );
      }
    },
  };
}
