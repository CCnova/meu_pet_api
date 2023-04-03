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

export type TAuthTokenVerificator = (token: string) => any;

export const verifyJwtToken: TAuthTokenVerificator = (token: string) => {
  return jsonwebtoken.verify(token, JWT_SECRET as string);
};
