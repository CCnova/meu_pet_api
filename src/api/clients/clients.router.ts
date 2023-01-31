import { prisma } from "../../libs";
import { TRouter } from "../../types";
import { AuthenticateService, RegisterService } from "./data/implementations";
import {
  CreateClientUserPrismaRepository,
  FindClientUserPrismaRepository,
} from "./infra/implementations";
import {
  AuthenticateController,
  RegisterController,
} from "./presentation/implementations";

export function setup(router: TRouter, basePath: string): TRouter {
  const registerDbClient =
    CreateClientUserPrismaRepository.createInstance(prisma);
  const registerService = RegisterService.createInstance(registerDbClient);
  const registerController = RegisterController.createInstance(registerService);
  router.post(`${basePath}/register`, registerController.handle);

  const authenticateDbClient =
    FindClientUserPrismaRepository.createInstance(prisma);
  const authenticateService =
    AuthenticateService.createInstance(authenticateDbClient);
  const authenticateController =
    AuthenticateController.createInstance(authenticateService);
  router.post(`${basePath}/auth`, authenticateController.handle);

  return router;
}
