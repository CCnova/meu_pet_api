import { DatabaseError } from "@meu-pet/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export enum PrismaErrorCode {
  UniqueConstraintFail = "P2002",
}

export interface IPrismaErrorAdapter {
  handleKnownRequestError: (
    error: PrismaClientKnownRequestError
  ) => DatabaseError;
}

export class PrismaErrorAdapter implements IPrismaErrorAdapter {
  handleKnownRequestError(error: PrismaClientKnownRequestError) {
    const [entity, key] = (error.meta?.target as string).split("_");

    switch (error.code) {
      case PrismaErrorCode.UniqueConstraintFail:
        return new DatabaseError(
          `${entity} record with given ${key} already exists`
        );
      default:
        return new DatabaseError(`Unknown error code code=${error.code}`);
    }
  }
}
