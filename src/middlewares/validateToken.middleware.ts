import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Invalid token, not able to go any further",
    });
  }

  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = { id: decoded.sub, isActive: decoded.isActive };
  });

  next();
};

export default validateTokenMiddleware;
