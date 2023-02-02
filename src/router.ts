import express from "express";
import * as ClientsRoutes from "./api/client/routes";

const BASE_PATH = "/api/v1";
const router = express.Router();

ClientsRoutes.setup(router, `${BASE_PATH}/client-user`);

export default router;
