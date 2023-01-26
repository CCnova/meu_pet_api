import { ClientUser } from "@prisma/client";

export type TRegisterClientUserDTO = Omit<ClientUser, "id">;
export type TAuthenticateClientUserDTO = {
  email: string;
  password: string;
};
