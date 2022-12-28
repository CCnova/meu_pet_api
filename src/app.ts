import bodyParser from "body-parser";
import express from "express";
import { ClientUserRouter } from "./routers";

const app = express();
const router = express.Router();

const BASE_PATH = "/v1";

app.use(bodyParser.json());
app.use(`${BASE_PATH}/client-user`, ClientUserRouter.setup(router));

export { app };
