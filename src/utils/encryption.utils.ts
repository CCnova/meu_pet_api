import * as bcrypt from "bcrypt";
import { logger } from ".";

export type TEncryptFn = (text: string) => Promise<string>;

export const encrypt: TEncryptFn = (text: string) => {
  const saltRounds = 10;

  return bcrypt.hash(text, saltRounds).catch((error) => {
    logger.log.error(`An error occurred while encrypting text=${text}`);
    throw error;
  });
};

export type TEncryptionCompareFn = (
  plainText: string,
  hash: string
) => Promise<boolean>;

export const compare: TEncryptionCompareFn = (
  plainText: string,
  hash: string
) => bcrypt.compare(plainText, hash);
