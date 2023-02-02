import * as crypto from "crypto";
import makeClientModel from "./client.model";

const idGenerator = {
  generate: () => crypto.randomUUID(),
};

const ClientModel = makeClientModel(idGenerator);

export { ClientModel };
