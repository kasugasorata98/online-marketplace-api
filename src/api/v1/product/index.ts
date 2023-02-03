import express, { Request, Response } from "express";
import ProductsModel from "../../../models/Products.model";
import StoresModel from "../../../models/Stores.model";
import { validateJwt } from "../../../utils";
const router = express.Router();
const ITEMS_PER_PAGE = 10;
router.get("/products", validateJwt, async (req: Request, res: Response) => {
  const page = req.query.page ? +req.query.page : 1;
  try {
    const totalItems = await ProductsModel.countDocuments();
    const products = await ProductsModel.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.status(200).send({
      products,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
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
      images: req.body.images,
      details: req.body.details,
      store: store._id,
    });
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
