import bodyParser from "body-parser";
import express from "express";
import GlobalRouter from "./router";

const app = express();

app.use(bodyParser.json());
app.use(GlobalRouter);

export { app };
