import { Router } from "express";
import { products } from "../data/products";

export const productsRouter = Router();

productsRouter.get("/", (_req, res) => {
  res.json(products);
});

productsRouter.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});
