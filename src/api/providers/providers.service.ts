import { ProviderUser } from "@prisma/client";
import { TRegisterProviderUserDTO } from "../../dtos/ProviderUser";
import { prisma } from "../../libs";
import { encrypt } from "../../utils";

export async function register(
  dto: TRegisterProviderUserDTO
): Promise<ProviderUser> {
  const { password: uncryptedPassword } = dto;
  const encryptedPassword = await encrypt(uncryptedPassword);

  return prisma.client.providerUser.create({
    data: { ...dto, password: encryptedPassword },
  });
}
