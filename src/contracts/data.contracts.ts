import { DatabaseError } from "@meu-pet/types";

export interface ICRUDDatabase<EntityType> {
  insert: (data: EntityType) => Promise<EntityType | DatabaseError>;
  bulkInsert: (data: EntityType[]) => Promise<EntityType[]>;
  delete: (id: string) => Promise<EntityType | null>;
  findOne: (where: Partial<EntityType>) => Promise<EntityType | null>;
}
