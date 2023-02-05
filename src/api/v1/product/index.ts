import express, { Request, Response } from "express";
import ProductsModel from "../../../models/Products.model";
import StoresModel from "../../../models/Stores.model";
import { validateJwt } from "../../../utils";
const router = express.Router();

router.get("/products", validateJwt, async (req: Request, res: Response) => {
  const searchQuery = req.query.search;
  const page = req.query.page ? +req.query.page : 1;
  const limit = req.query.limit ? +req.query.limit : 10;

  try {
    let products;

    if (!searchQuery) {
      products = await ProductsModel.find()
        .populate("store", "-products")
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      products = await ProductsModel.find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { details: { $regex: searchQuery, $options: "i" } },
        ],
      })
        .populate("store", "-products")
        .skip((page - 1) * limit)
        .limit(limit);
    }

    return res.status(200).json({ products });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/products", validateJwt, async (req: Request, res: Response) => {
  try {
    const store = await StoresModel.findById(req.body.storeId);
    if (!store) {
      return res.status(400).json({ message: "Store not found" });
    }

    const newProduct = await ProductsModel.create({
      title: req.body.title,
      price: req.body.price,
      details: req.body.details,
      store: store._id,
    });
    newProduct.images.push(req.body.image);
    await newProduct.save();
    store.products.push(newProduct._id);
    await store.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
