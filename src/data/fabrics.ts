// src/data/fabrics.ts

export interface Fabric {
  id: string;
  name: string;
  origin: string;
  texture: string;
  quality: string;
  suitableFor: string[];
  image: string;
  description: string;
}

export const fabrics: Fabric[] = [
  {
    id: "pure-wool",
    name: "Pure Wool",
    origin: "England / Australia",
    texture: "Smooth, soft, and slightly structured",
    quality: "Premium — breathable, durable, wrinkle-resistant",
    suitableFor: ["Formal Suits", "Blazers", "Trousers", "Wedding Attire"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description:
      "The gold standard of suiting fabric. Pure wool offers outstanding breathability across seasons and develops a beautiful drape over time.",
  },
  {
    id: "premium-cotton",
    name: "Premium Cotton",
    origin: "Egypt / India",
    texture: "Crisp, cool, and lightweight",
    quality: "High — easy care, strong, excellent print retention",
    suitableFor: ["Shirts", "Casual Wear", "School Uniforms", "Tropical Suits"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    description:
      "Egyptian and long-staple cotton delivers extraordinary softness and durability. An essential choice for shirts and warm-climate garments.",
  },
  {
    id: "silk-blend",
    name: "Silk & Silk Blend",
    origin: "China / Thailand",
    texture: "Lustrous, fluid, and delicate",
    quality: "Luxury — exceptional sheen, temperature-regulating",
    suitableFor: ["Wedding Wear", "Evening Wear", "Traditional Attire", "Linings"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    description:
      "Silk's natural luminosity and fluid drape make it the fabric of celebration. Used in our finest wedding and ceremonial garments.",
  },
  {
    id: "linen",
    name: "Linen",
    origin: "Belgium / Sri Lanka",
    texture: "Textured, breathable, and relaxed",
    quality: "High — naturally hypoallergenic, becomes softer with wear",
    suitableFor: ["Summer Suits", "Casual Shirts", "Tropical Wear", "Trousers"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    description:
      "Linen's natural texture and exceptional breathability make it the premier choice for warm climates. It carries effortless elegance.",
  },
  {
    id: "poly-wool-blend",
    name: "Poly-Wool Blend",
    origin: "International",
    texture: "Smooth, consistent, and firm",
    quality: "Good — affordable, shape-retaining, low maintenance",
    suitableFor: ["Corporate Uniforms", "School Uniforms", "Everyday Suits", "Trousers"],
    image: "https://images.unsplash.com/photo-1606335543042-57c525922933?w=800&q=80",
    description:
      "A practical and cost-effective choice for uniforms and everyday wear. Retains shape well and withstands frequent washing.",
  },
  {
    id: "velvet",
    name: "Velvet",
    origin: "Italy / India",
    texture: "Rich, plush, and deep",
    quality: "Premium — opulent appearance, excellent colour depth",
    suitableFor: ["Formal Evening Wear", "Wedding Blazers", "Ceremonial Jackets", "Traditional Wear"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    description:
      "Velvet commands attention. Its deep pile and rich colour saturation make it the ultimate choice for formal and celebratory occasions.",
  },
];
