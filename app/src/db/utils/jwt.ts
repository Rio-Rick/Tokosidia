import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "verySecret";
export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET_KEY);
};
export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

// export const signTokenJose = async (payload: object) => {
//     const secretKey = new TextEncoder().encode(SECRET_KEY)
//     const signJose = await new jose.SignJWT(payload).sign(secretKey)
// }
export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const verifyTokenJose = await jose.jwtVerify<T>(token, secretKey);

  return verifyTokenJose.payload;
};
