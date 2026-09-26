// Placeholder catalog: swap for real Hostinger-hosted photos once product photos arrive.
// Hand-picked picsum.photos IDs (menswear/people shots from its fixed Unsplash library), not random seeds.

export type ProductStatus = "active" | "coming_soon" | "sold_out";

export interface ProductImage {
  role: "front" | "hover";
  url: string;
  order: number;
}

export interface Variant {
  id: string;
  color: string;
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // BDT
  category: string;
  status: ProductStatus;
  images: ProductImage[];
  variants: Variant[];
}

function placeholderPair(frontId: number, hoverId: number): ProductImage[] {
  return [
    { role: "front", order: 0, url: `https://picsum.photos/id/${frontId}/800/1000` },
    { role: "hover", order: 1, url: `https://picsum.photos/id/${hoverId}/800/1000` },
  ];
}

export const products: Product[] = [
  {
    id: "henley-01",
    name: "Signature Henley",
    description: "Quiet-luxury essential in heavyweight cotton.",
    price: 850,
    category: "Henleys",
    status: "active",
    images: placeholderPair(669, 856),
    variants: [
      { id: "henley-01-black-m", color: "Black", size: "M", stock: 12 },
      { id: "henley-01-black-l", color: "Black", size: "L", stock: 8 },
      { id: "henley-01-ivory-m", color: "Ivory", size: "M", stock: 5 },
    ],
  },
  {
    id: "ringer-01",
    name: "Ringer Tee",
    description: "Contrast-trim ringer tee, relaxed fit.",
    price: 800,
    category: "T-Shirts",
    status: "active",
    images: placeholderPair(91, 319),
    variants: [
      { id: "ringer-01-black-m", color: "Black", size: "M", stock: 10 },
      { id: "ringer-01-black-l", color: "Black", size: "L", stock: 0 },
    ],
  },
  {
    id: "hoodie-01",
    name: "Chestnut Hoodie",
    description: "Coming soon — teaser listing only, not purchasable.",
    price: 1600,
    category: "Hoodies",
    status: "coming_soon",
    images: placeholderPair(338, 883),
    variants: [],
  },
  {
    id: "pants-01",
    name: "Tailored Pants",
    description: "Manufactured-demand sold-out listing (manual override).",
    price: 1400,
    category: "Pants",
    status: "sold_out",
    images: placeholderPair(604, 662),
    variants: [{ id: "pants-01-black-32", color: "Black", size: "32", stock: 0 }],
  },
];
