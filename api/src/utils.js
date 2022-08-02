import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { User } from "./resources/user/user.model";

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

export function checkFormatToken(token) {
  return (
    token && token.trim().startsWith("Bearer ") && getToken(token).length > 0
  );
}

export function getToken(token) {
  return token.split("Bearer ").filter(Boolean)[0];
}

export function decodeToken(token) {
  if (checkFormatToken(token)) {
    const payLoad = jwtDecode(getToken(token));
    return payLoad;
  }
  return null;
}
export async function checkPassword(password, savedPassword) {
  return await bcrypt.compare(password, savedPassword);
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    console.log("token", token, "secret", process.env.JWT_SECRET);
    jwt.verify(token.trim(), process.env.JWT_SECRET, (err, payload) => {
      console.log("callback", err, payload);
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
}

export async function protect(req, res, next) {
  try {
    const headers = JSON.parse(JSON.stringify(req.headers));
    const authorizationToken = headers.authorization;
    console.log("autorizationToken", authorizationToken);
    const tokenPayload =
      checkFormatToken(authorizationToken) &&
      (await verifyToken(getToken(authorizationToken)));
    console.log("payload", tokenPayload);
    if (!tokenPayload) {
      return res.status(401).send({ message: "invalid token" });
    }

    const user = await User.findById(tokenPayload.userId)
      .select("-password")
      .exec();
    if (!user) {
      return res.status(401).send({ message: "invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}
