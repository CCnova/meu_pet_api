import express from "express";
import { ClientRouter } from "./client";
import { ProviderRouter } from "./provider";

const BASE_PATH_V1 = "/api/v1";

const router = express.Router();

// router.use(
//   expressAdapter.adaptMiddleware(
//     authenticationMiddlewares.verifyAuthenticationToken
//   )
// );

ClientRouter.setup({ router, basePath: `${BASE_PATH_V1}/client-user` });
ProviderRouter.setup({ router, basePath: `${BASE_PATH_V1}/provider-user` });

export default router;
