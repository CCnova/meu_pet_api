import express from "express";
import { ClientRouter } from "./client";

const BASE_PATH_V1 = "/api/v1";

const router = express.Router();

ClientRouter.setup({ router, basePath: `${BASE_PATH_V1}/client-user` });

export default router;
