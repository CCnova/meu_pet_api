import { ProviderUser } from "@prisma/client";

export interface IProvider extends ProviderUser {}

export type TAuthenticatedProviderInfo = {
  user: Omit<IProvider, "password">;
  token: string;
};
