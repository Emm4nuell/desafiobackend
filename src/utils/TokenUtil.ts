import "dotenv/config";
import jwt from "jsonwebtoken";
import GlobalException from "../exceptions/GlobalException";

export default class TokenUtil {
  async generate(id: string, email: string) {
    const token = jwt.sign(
      { id, email },
      process.env.SECRETE_KEY_TOKEN as string,
      { expiresIn: "1m" }
    );
    return token;
  }
  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRETE_KEY_TOKEN as string
      );
      return decoded;
    } catch (err) {
      console.log(err);
      throw GlobalException.unauthorized("Token inválido ou expirado");
    }
  }
}
