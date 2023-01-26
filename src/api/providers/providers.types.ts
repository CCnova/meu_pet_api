import { ProviderUser } from "@prisma/client";

export type TRegisterProviderUserDTO = Omit<ProviderUser, "id">;
