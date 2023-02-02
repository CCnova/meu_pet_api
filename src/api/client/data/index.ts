import { prisma } from "../../../libs";
import makeClientPrismaRepository from "./clientPrisma.repository";

const ClientRepository = makeClientPrismaRepository(prisma);

export { ClientRepository };
