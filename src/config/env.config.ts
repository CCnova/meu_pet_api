const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error("env variable JWT_SECRET is not set!");

export { JWT_SECRET };
