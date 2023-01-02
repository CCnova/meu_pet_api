import bodyParser from "body-parser";
import express from "express";
import { GlobalRouter } from "./routers";

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(GlobalRouter.setup(router));

export { app };
