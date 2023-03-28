import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export type TAuthTokenGenerator = (
  payload: any,
  expiresIn: string | number
) => string;

export const generateJwtToken: TAuthTokenGenerator = (
  payload: any,
  expiresIn: string | number
) => jsonwebtoken.sign(payload, JWT_SECRET as string, { expiresIn });

export const verifyJwtToken = (token: string) => {
  return jsonwebtoken.verify(token, JWT_SECRET as string);
};
