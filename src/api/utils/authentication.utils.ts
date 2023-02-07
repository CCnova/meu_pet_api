import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export function generateToken(payload: any, expiresIn: string | number) {
  return jsonwebtoken.sign(payload, JWT_SECRET as string, { expiresIn });
}
export function verifyToken(token: string) {
  return jsonwebtoken.verify(token, JWT_SECRET as string);
}
