import { IPet } from "@meu-pet/pet/types";
import { ClientModel, PetModel } from "../../models";
import { TCreateClientResult } from "../../models/client.model";
import { TCreatePetResult } from "../../models/pet.model";
import { IPetDatabase } from "../../pet/contracts";
import { InternalServerError, ValidationError } from "../../types/errors.types";
import { encrypt, fns, logger } from "../../utils";
import { IClientDatabase } from "../contracts/data.contracts";
import { TRegisterClientUseCase } from "../contracts/useCases.contracts";
import { IClient } from "../types";

function persistClient(dependencies: {
  clientRepo: IClientDatabase;
  modelCreateResult: TCreateClientResult;
}) {
  return dependencies.clientRepo.insert(
    dependencies.modelCreateResult as IClient
  );
}

async function persistPets(dependencies: {
  petRepo: IPetDatabase;
  pets: TCreatePetResult[];
  owner: IClient;
}) {
  const pets = await dependencies.petRepo.bulkInsert(
    dependencies.pets as IPet[]
  );

  return { ...dependencies.owner, pets };
}

function revertUseCase(params: {
  client: IClient;
  pets: IPet[];
  clientRepo: IClientDatabase;
  petRepo: IPetDatabase;
}): Promise<any> {
  return Promise.all([
    params.clientRepo.delete(params.client.id),
    ...params.pets.map((pet) => params.petRepo.delete(pet.id)),
  ]);
}

export default function makeRegisterClientUseCase(params: {
  clientRepo: IClientDatabase;
  petRepo: IPetDatabase;
}): TRegisterClientUseCase {
  return async function(dto) {
    const { pets, ...clientData } = dto;

    const createClientResult = ClientModel.createClient(clientData);
    if (createClientResult instanceof ValidationError)
      return Promise.resolve(createClientResult);

    const createPetsResult = pets.map((pet) => PetModel.createPet(pet));
    if (createPetsResult.some((result) => result instanceof ValidationError))
      return Promise.resolve(
        fns.filterInstancesOf<ValidationError>(
          createPetsResult,
          new ValidationError("example message")
        )
      );

    const encryptedPassword = await encrypt(createClientResult.password)

    return persistClient({
      clientRepo: params.clientRepo,
      modelCreateResult: { ...createClientResult, password: encryptedPassword },
    })
      .then((persistedClient) =>
        persistPets({
          petRepo: params.petRepo,
          pets: createPetsResult,
          owner: persistedClient,
        })
      )
      .catch((error) => {
        logger.log.error(`An error has occurred while trying to persis the client user error=${error}`);

        // Todo(CCnova): unit test this case
        revertUseCase({
          client: createClientResult,
          pets: createPetsResult as IPet[],
          clientRepo: params.clientRepo,
          petRepo: params.petRepo,
        });
        return new InternalServerError(
          `An unknown error has occurred while trying to register new client user. If this persist, please contact support`
        );
      });
  };
}
