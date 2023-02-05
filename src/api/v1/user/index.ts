import express, { Request, Response } from "express";
import UsersModel from "../../../models/Users.model";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateJwt } from "../../../utils";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UsersModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UsersModel.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user", validateJwt, async (req: any, res: Response) => {
  try {
    const user = await UsersModel.findOne({ _id: req.userId }).select(
      "-password"
    );
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
