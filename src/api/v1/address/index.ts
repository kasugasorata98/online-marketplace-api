import express, { Response } from "express";
import AddressesModel from "../../../models/Addresses.model";
import UsersModel from "../../../models/Users.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.get("/address", validateJwt, async (req: any, res: Response) => {
  try {
    const addresses = await AddressesModel.find({ user: req.userId });
    return res.status(200).json({ addresses });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
});

router.post("/address", validateJwt, async (req: any, res: Response) => {
  try {
    const addresses = await AddressesModel.create({
      user: req.userId,
      unitNo: req.body.unitNo,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    });
    await UsersModel.findByIdAndUpdate(req.userId, {
      $push: {
        addresses: addresses._id,
      },
    });
    return res.status(200).json({ addresses });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
});

export default router;
