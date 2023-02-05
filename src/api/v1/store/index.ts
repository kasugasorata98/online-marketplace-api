import express, { Response } from "express";
import StoresModel from "../../../models/Stores.model";
import UsersModel from "../../../models/Users.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.post("/stores", validateJwt, async (req: any, res: Response) => {
  try {
    const newStore = await StoresModel.create({
      name: req.body.name,
      image: req.body.image,
      user: req.userId,
    });
    await UsersModel.findByIdAndUpdate(req.userId, {
      $push: {
        stores: newStore._id,
      },
    });
    res.status(201).json(newStore);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
