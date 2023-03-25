import { prisma } from "../../libs";
import makePetPrismaRepository from "./petPrisma.repository";

const PetRepository = makePetPrismaRepository(prisma);

export { PetRepository };
