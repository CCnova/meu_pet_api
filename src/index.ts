import { app } from "./app";
import * as server from "./server";

const { SERVER_PORT } = process.env;

server.start(app, SERVER_PORT);
