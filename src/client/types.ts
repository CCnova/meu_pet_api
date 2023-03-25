import { ClientUser } from "@prisma/client";
import { IPet } from "../pet/types";

export interface IClient extends ClientUser {}
export interface IClientWithPets extends ClientUser {
  pets: IPet[];
}

export type TAuthenticatedClientInfo = {
  user: Omit<IClient, "password">;
  token: string;
};
