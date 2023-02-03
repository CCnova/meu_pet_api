import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { fns } from "../../../utils";
import { ClientModel, PetModel } from "../../models";
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
      const { pets, ...clientData } = dto;

      const createClientResult = ClientModel.createClient(clientData);
      if (createClientResult instanceof ValidationError)
        return createClientResult;

      const createPetsResult = pets.map((pet) => PetModel.createPet(pet));
      if (createPetsResult.some((result) => result instanceof ValidationError))
        return fns.filterInstancesOf<ValidationError>(
          createPetsResult,
          new ValidationError("place-holder message")
        );
      // return createPetsResult.filter(
      //   (result) => result instanceof ValidationError
      // ) as ValidationError[];

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
