export interface IDatabase<EntityType> {
  insert: (data: EntityType) => Promise<EntityType>;
  bulkInsert: (data: EntityType[]) => Promise<EntityType[]>;
  delete: (id: string) => Promise<EntityType | null>;
  findOne: (where: Partial<EntityType>) => Promise<EntityType | null>;
}
