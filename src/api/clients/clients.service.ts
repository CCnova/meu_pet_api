import { ClientUser } from "@prisma/client";
import { prisma } from "../../libs";
import { EErrorMessages } from "../../types";
import { compare, encrypt } from "../../utils";
import { AuthenticationError } from "./clients.errors";
import {
  DatabaseClient,
  TAuthenticateClientUserDTO,
  TRegisterClientUserDTO,
} from "./clients.types";

export function createInstace(clientsDatabase: DatabaseClient) {
  return {
    async register(dto: TRegisterClientUserDTO): Promise<ClientUser> {
      const { password: uncryptedPassword } = dto;
      const encryptedPassword = await encrypt(uncryptedPassword);

      return clientsDatabase.create({
        data: { ...dto, password: encryptedPassword },
      });
    },
    async authenticate(dto: TAuthenticateClientUserDTO): Promise<ClientUser> {
      const user = await clientsDatabase.findUnique({
        where: { email: dto.email },
      });
      if (!user)
        throw new AuthenticationError(EErrorMessages.AuthenticationError);

      const isPasswordCorrect = await compare(dto.password, user.password);
      if (!isPasswordCorrect)
        throw new AuthenticationError(EErrorMessages.AuthenticationError);

      return user;
    },
  };
}

export default createInstace(prisma.client.clientUser);
