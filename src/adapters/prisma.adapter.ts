import { DatabaseError } from "@meu-pet/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export enum PrismaErrorCode {
  UniqueConstraintFail = "P2002",
}

export function handleKnownRequestError(error: PrismaClientKnownRequestError) {
  const [entity, key] = (error.meta?.target as string).split("_");
  if (error.code === PrismaErrorCode.UniqueConstraintFail)
    return new DatabaseError(
      `${entity} record with given ${key} already exists`
    );
}
