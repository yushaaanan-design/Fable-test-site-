import "dotenv/config";
import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products";
import { checkoutRouter } from "./routes/checkout";
import { adminRouter } from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true, // needed once admin session cookies + Clerk are wired in (cross-domain: Vercel <-> Render)
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/products", productsRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Fable API running on http://localhost:${PORT}`);
});
