import express, { Request, Response } from "express";
import PaymentMethodsModel from "../../../models/PaymentMethods.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.post("/payment", validateJwt, async (req: Request, res: Response) => {
  try {
    const paymentMethod = await PaymentMethodsModel.create({
      name: req.body.name,
    });
    res.status(201).json({ paymentMethod });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/payment", validateJwt, async (req: Request, res: Response) => {
  try {
    const paymentMethods = await PaymentMethodsModel.find();
    res.status(200).json({ paymentMethods });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
