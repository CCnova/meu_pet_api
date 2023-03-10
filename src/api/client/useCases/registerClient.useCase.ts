import {
  InternalServerError,
  ValidationError,
} from "../../../types/errors.types";
import { fns } from "../../../utils";
import { ClientModel, PetModel } from "../../models";
import { TCreateClientResult } from "../../models/client.model";
import { TCreatePetResult } from "../../models/pet.model";
import { IPetDatabase } from "../../pet/contracts";
import { IClient, IPet } from "../../types";
import { IClientDatabase } from "../contracts/data.contracts";
import { TRegisterClientUseCase } from "../contracts/useCases.contracts";

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
  return (dto) => {
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

    return persistClient({
      clientRepo: params.clientRepo,
      modelCreateResult: createClientResult,
    })
      .then((persistedClient) =>
        persistPets({
          petRepo: params.petRepo,
          pets: createPetsResult,
          owner: persistedClient,
        })
      )
      .catch((error) => {
        // Todo(CCnova): unit test this case
        revertUseCase({
          client: createClientResult,
          pets: createPetsResult as IPet[],
          clientRepo: params.clientRepo,
          petRepo: params.petRepo,
        });
        return new InternalServerError(
          `An unknown error has occurred while trying to register new client user with dto=${dto}, error=${error}`
        );
      });
  };
}
