import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export const validateJwt = (req: any, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({ error: "Failed to authenticate" });
      }
      req.userId = decoded.userId;
      next();
    }
  );
};
