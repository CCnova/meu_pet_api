import { ClientUser, Prisma } from "@prisma/client";

export type TRegisterClientUserDTO = Omit<ClientUser, "id">;
export type TAuthenticateClientUserDTO = {
  email: string;
  password: string;
};

export type DatabaseClient = Prisma.ClientUserDelegate<
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;
