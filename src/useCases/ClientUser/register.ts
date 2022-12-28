import { ClientUser } from "@prisma/client";
import { ClientUserDTOs } from "../../dtos";
import { prisma } from "../../libs";
import { encrypt } from "../../utils";

export async function register(
  dto: ClientUserDTOs.TRegisterClientUserDTO
): Promise<ClientUser> {
  const { password: uncryptedPassword } = dto;
  const encryptedPassword = await encrypt(uncryptedPassword);

  return prisma.client.clientUser.create({
    data: { ...dto, password: encryptedPassword },
  });
}
