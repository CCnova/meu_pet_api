import * as crypto from "crypto";
import makeClientModel from "./client.model";
import makePetModel from "./pet.model";
import makeProviderModel from "./provider.model";

const idGenerator = {
  generate: () => crypto.randomUUID(),
};

const ClientModel = makeClientModel(idGenerator);
const PetModel = makePetModel(idGenerator);
const ProviderModel = makeProviderModel(idGenerator);

export { ClientModel, PetModel, ProviderModel };
