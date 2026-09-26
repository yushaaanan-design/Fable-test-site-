import { Router } from "express";

export const checkoutRouter = Router();

interface CheckoutItem {
  productId: string;
  variantId?: string;
  qty: number;
  price: number;
}

interface CheckoutBody {
  name: string;
  phone: string;
  address: string;
  email?: string;
  notes?: string;
  paymentMethod: "cod" | "bkash" | "nagad" | "sslcommerz";
  items: CheckoutItem[];
}

// Mock order creation — no DB yet. Validates shape, computes total server-side
// (never trusts a client-sent total), returns a fake order + payment branch.
checkoutRouter.post("/", (req, res) => {
  const body = req.body as CheckoutBody;

  if (!body.name || !body.phone || !body.address || !body.paymentMethod || !body.items?.length) {
    return res.status(400).json({ error: "Missing required checkout fields" });
  }

  const total = body.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderId = "FBL-" + Math.floor(100000 + Math.random() * 900000);

  if (body.paymentMethod === "cod") {
    return res.json({ orderId, total, status: "confirmed", redirect: null });
  }

  // bKash / Nagad / SSLCommerz: real flow redirects off-site to the gateway.
  // Mocked here — pretend the gateway always succeeds instantly.
  return res.json({ orderId, total, status: "confirmed", redirect: null, gateway: body.paymentMethod });
});
