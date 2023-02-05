import express, { Request, Response } from "express";
import AddressesModel from "../../../models/Addresses.model";
import PaymentMethodsModel from "../../../models/PaymentMethods.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.post("/paymentMethods", async (req: Request, res: Response) => {
  try {
    const paymentMethod = await PaymentMethodsModel.create(req.body);
    res.status(201).json({ paymentMethod });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/paymentMethods", async (req: Request, res: Response) => {
  try {
    const paymentMethods = await PaymentMethodsModel.find();
    res.status(200).json({ paymentMethods });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/addresses", validateJwt, async (req: any, res: Response) => {
  try {
    const addresses = await AddressesModel.find({ user: req.userId });
    return res.status(200).json({ addresses });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
});

export default router;
