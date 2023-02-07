import * as jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { expect } from "chai";
import { validateJwt } from "../../src/utils";
import dotenv from "dotenv";
dotenv.config();

describe("validateJwt middleware", () => {
  let req: any;
  let res: any;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "",
      },
    };
    res = {
      status: (status: any) => {
        res.status = status;
        return res;
      },
      json: (json: any) => {
        res.json = json;
      },
    };
    next = () => {};
  });

  it("should return 401 if no token is provided", async () => {
    validateJwt(req, res, next);
    expect(res.status).to.equal(401);
    expect(res.json).to.deep.equal({ error: "No token provided" });
  });

  it("should return 401 if authentication failed", async () => {
    req.headers.authorization = "Bearer invalidToken";
    validateJwt(req, res, next);
    expect(res.status).to.equal(401);
    expect(res.json).to.deep.equal({ error: "Failed to authenticate" });
  });

  it("should call next if authentication succeeded", async () => {
    const userId = "user123";
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "");
    req.headers.authorization = `Bearer ${token}`;
    let nextCalled = false;
    next = () => {
      nextCalled = true;
    };
    validateJwt(req, res, next);
    expect(nextCalled).to.be.true;
    expect(req.userId).to.equal(userId);
  });
});
