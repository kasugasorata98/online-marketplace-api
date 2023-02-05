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
    res.json({ message: "Cart entry created", cart });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/cart", validateJwt, async (req: any, res: Response) => {
  try {
    const carts = await CartModel.find({ user: req.userId }).populate(
      "product"
    );
    res.json({ carts });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/cart/:id", validateJwt, async (req: any, res: Response) => {
  const cart = await CartModel.findById(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  if (cart.user !== req.userId) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  if (req.body.quantity) {
    cart.quantity = req.body.quantity;
  }

  if (req.body.shippingMethod) {
    cart.shippingMethod = req.body.shippingMethod;
  }

  try {
    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: "Error updating cart" });
  }
});

router.delete("/cart/:id", validateJwt, async (req: any, res: Response) => {
  try {
    const cart = await CartModel.findById(req.params.id);
    if (!cart) return res.status(404).json("Cart entry not found");
    if (cart.user !== req.userId)
      return res.status(401).json("Unauthorized access");
    await cart.remove();
    res.status(204).json();
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

export default router;
