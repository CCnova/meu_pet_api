import * as crypto from "crypto";
import makeClientModel from "./client.model";
import makePetModel from "./pet.model";

const idGenerator = {
  generate: () => crypto.randomUUID(),
};

const ClientModel = makeClientModel(idGenerator);
const PetModel = makePetModel(idGenerator);

export { ClientModel, PetModel };
