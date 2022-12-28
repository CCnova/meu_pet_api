import { ClientUser } from "@prisma/client";

export type TRegisterClientUserDTO = Omit<ClientUser, "id">;
