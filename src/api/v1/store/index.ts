import express, { Request, Response } from "express";
import StoresModel from "../../../models/Stores.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.post("/stores", validateJwt, async (req: Request, res: Response) => {
  try {
    const newStore = await StoresModel.create({
      name: req.body.name,
      image: req.body.image,
    });
    res.status(201).json(newStore);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
