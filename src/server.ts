import { IApplication } from "./types";

const { SERVER_PORT } = process.env;

export function start(app: IApplication) {
  return app.listen(SERVER_PORT ?? 3000, () => {
    console.log(`Server listening on port: ${SERVER_PORT}`);
  });
}
