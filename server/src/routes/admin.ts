import { Router } from "express";

export const adminRouter = Router();

// Mock admin auth — no real session/bcrypt yet, just simulates success.
adminRouter.post("/login", (req, res) => {
  const { password } = req.body || {};
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }
  res.json({ ok: true, token: "mock-admin-session" });
});

let mockOrders = [
  {
    id: "FBL-1001",
    customer: "Nusrat Jahan",
    address: "House 12, Road 7, Dhanmondi, Dhaka",
    items: [{ name: "Signature Henley", qty: 1, price: 850 }],
    total: 850,
    paymentMethod: "bKash",
    paymentStatus: "paid",
    courierStatus: "pending",
  },
  {
    id: "FBL-1002",
    customer: "Rakibul Hasan",
    address: "Flat 4B, Agrabad Access Road, Chattogram",
    items: [
      { name: "Ringer Tee", qty: 2, price: 800 },
      { name: "Signature Henley", qty: 1, price: 850 },
    ],
    total: 2450,
    paymentMethod: "COD",
    paymentStatus: "pending",
    courierStatus: "not_booked",
  },
  {
    id: "FBL-1003",
    customer: "Farzana Ahmed",
    address: "House 3, Sector 11, Uttara, Dhaka",
    items: [{ name: "Ringer Tee", qty: 1, price: 800 }],
    total: 800,
    paymentMethod: "SSLCommerz",
    paymentStatus: "paid",
    courierStatus: "shipped",
  },
];

adminRouter.get("/orders", (_req, res) => {
  res.json(mockOrders);
});

adminRouter.put("/orders/:id", (req, res) => {
  const order = mockOrders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  Object.assign(order, req.body);
  res.json(order);
});

// Mock product create — just echoes back with a fake id, no persistence.
adminRouter.post("/products", (req, res) => {
  res.json({ id: `mock-${Date.now()}`, ...req.body });
});

let mockDiscountCodes = [
  { code: "FABLE10", type: "percent", amount: 10, expiry: "2026-12-31", usageLimit: 100 },
  { code: "WELCOME100", type: "flat", amount: 100, expiry: "2026-10-31", usageLimit: 500 },
];

adminRouter.get("/discount-codes", (_req, res) => {
  res.json(mockDiscountCodes);
});

adminRouter.post("/discount-codes", (req, res) => {
  const code = req.body;
  mockDiscountCodes.push(code);
  res.status(201).json(code);
});

adminRouter.get("/low-stock", (_req, res) => {
  res.json([
    { productName: "Ringer Tee", color: "Black", size: "L", stock: 0, threshold: 5 },
    { productName: "Signature Henley", color: "Ivory", size: "M", stock: 5, threshold: 5 },
  ]);
});
