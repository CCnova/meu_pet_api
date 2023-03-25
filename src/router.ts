import express from "express";
import { ClientRouter } from "./client";

const BASE_PATH = "/api/v1";
const router = express.Router();

ClientRouter.setup({ router, basePath: `${BASE_PATH}/client-user` });

export default router;
