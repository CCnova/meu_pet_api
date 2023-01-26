import { ClientUser } from "@prisma/client";
import { prisma } from "../../libs";
import { encrypt } from "../../utils";
import {
  TAuthenticateClientUserDTO,
  TRegisterClientUserDTO,
} from "./clients.types";

export async function register(
  dto: TRegisterClientUserDTO
): Promise<ClientUser> {
  const { password: uncryptedPassword } = dto;
  const encryptedPassword = await encrypt(uncryptedPassword);

  return prisma.client.clientUser.create({
    data: { ...dto, password: encryptedPassword },
  });
}

// Todo(CNova): Implement
export declare function authenticate(
  dto: TAuthenticateClientUserDTO
): Promise<ClientUser>;
