import { TApplication } from "./types";

export function start(app: TApplication, port?: string | number) {
  return app.listen(port ?? 3000, () => {
    console.log(`Server listening on port: ${port}`);
  });
}
