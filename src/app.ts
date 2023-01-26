import bodyParser from "body-parser";
import express from "express";
import * as GlobalRouter from "./router";

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(GlobalRouter.setup(router));

export { app };
