import * as bcrypt from "bcrypt";

export async function encrypt(text: string) {
  const saltRounds = 10;

  return bcrypt.hash(text, saltRounds).catch((error) => {
    console.log("An error occurred while encrypting text = ", text);
    throw error;
  });
}