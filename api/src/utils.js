import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function saltPassword(password) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    return Promise.resolve(hashPassword);
  } catch (err) {
    return Promise.reject(err);
  }
}
export function createToken(userId) {
  return jwt.sign({ userId, iss: "api.article-app" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
export async function checkPassword(password, savedPassword) {
  return await bcrypt.compare(password, savedPassword);
}
