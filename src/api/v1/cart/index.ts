import express, { Request, Response } from "express";
import CartModel from "../../../models/Cart.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.post("/cart", validateJwt, async (req: Request, res: Response) => {
  try {
    const cart = await CartModel.create({
      quantity: req.body.quantity,
      shippingMethod: req.body.shippingMethod,
      product: req.body.product,
    });
    res.send({ message: "Cart entry created", cart });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
