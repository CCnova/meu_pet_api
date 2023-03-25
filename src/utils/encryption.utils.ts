import * as bcrypt from "bcrypt";
import { logger } from ".";

export function encrypt(text: string) {
  const saltRounds = 10;

  return bcrypt.hash(text, saltRounds).catch((error) => {
    logger.log.error(`An error occurred while encrypting text=${text}`);
    throw error;
  });
}

export function compare(plainText: string, hash: string) {
  return bcrypt.compare(plainText, hash);
}
