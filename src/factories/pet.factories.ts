import { IPet } from "@meu-pet/pet/types";
import * as crypto from "crypto";

export function createMPet(attrs?: Partial<IPet>): IPet {
  return {
    id: crypto.randomUUID(),
    breed: "SRD",
    dateOfBirth: new Date("01/01/1990"),
    name: "Test Pet",
    ownerId: crypto.randomUUID(),
    ...attrs,
  };
}

export function createMUserPets(quantity: number, ownerId?: string): IPet[] {
  return Array.from({ length: quantity }, () => createMPet({ ownerId }));
}
