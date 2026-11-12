import bambooToothbrush from "@/assets/products/bamboo-toothbrush.jpg";
import steelBottle from "@/assets/products/steel-bottle.jpg";
import cottonTote from "@/assets/products/cotton-tote.jpg";
import beeswaxWraps from "@/assets/products/beeswax-wraps.jpg";
import solarPowerbank from "@/assets/products/solar-powerbank.jpg";
import recycledNotebook from "@/assets/products/recycled-notebook.jpg";
import loofah from "@/assets/products/loofah.jpg";
import organicTshirt from "@/assets/products/organic-tshirt.jpg";
import ledBulb from "@/assets/products/led-bulb.jpg";
import dishSoap from "@/assets/products/dish-soap.jpg";
import polyesterJacket from "@/assets/products/polyester-jacket.jpg";
import plasticCutlery from "@/assets/products/plastic-cutlery.jpg";
import coconutBowls from "@/assets/products/coconut-bowls.jpg";
import shampooBar from "@/assets/products/shampoo-bar.jpg";
import earbuds from "@/assets/products/earbuds.jpg";
import corkYogaMat from "@/assets/products/cork-yoga-mat.jpg";
import phoneCase from "@/assets/products/phone-case.jpg";
import scentedCandle from "@/assets/products/scented-candle.jpg";

export type EcoScore = "A" | "B" | "C" | "D" | "E" | "F";

export interface Sustainability {
  carbonKg: number; // CO2e per unit
  materials: string;
  packaging: string;
  recyclable: boolean;
  origin: string;
  certifications: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number; // INR
  category: Category;
  ecoScore: EcoScore | null; // null = Eco Data Unavailable
  rating: number;
  description: string;
  sustainability: Sustainability | null;
}

export const CATEGORIES = [
  "Personal Care",
  "Kitchen",
  "Fashion",
  "Electronics",
  "Home",
  "Stationery",
  "Fitness",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const ECO_SCORES: EcoScore[] = ["A", "B", "C", "D", "E", "F"];

export const products: Product[] = [
  {
    id: "bamboo-toothbrush-set",
    name: "Bamboo Toothbrush Set (4 pack)",
    brand: "GreenSmile",
    image: bambooToothbrush,
    price: 299,
    category: "Personal Care",
    ecoScore: "A",
    rating: 4.7,
    description:
      "Biodegradable bamboo handles with plant-based bristles. A simple swap that keeps plastic out of landfills.",
    sustainability: {
      carbonKg: 0.2,
      materials: "Moso bamboo, castor-oil bristles",
      packaging: "Compostable kraft box",
      recyclable: true,
      origin: "India",
      certifications: ["FSC", "Vegan"],
    },
  },
  {
    id: "steel-water-bottle",
    name: "Insulated Steel Water Bottle",
    brand: "TerraFlask",
    image: steelBottle,
    price: 899,
    category: "Kitchen",
    ecoScore: "A",
    rating: 4.8,
    description:
      "Double-walled stainless steel bottle that keeps drinks cold for 24 hours. Replaces hundreds of plastic bottles.",
    sustainability: {
      carbonKg: 2.1,
      materials: "18/8 food-grade stainless steel",
      packaging: "Recycled cardboard",
      recyclable: true,
      origin: "India",
      certifications: ["BPA-Free"],
    },
  },
  {
    id: "organic-cotton-tote",
    name: "Organic Cotton Tote Bag",
    brand: "LoopCarry",
    image: cottonTote,
    price: 349,
    category: "Fashion",
    ecoScore: "A",
    rating: 4.6,
    description:
      "Sturdy, washable tote made from GOTS-certified organic cotton. Perfect for groceries and daily errands.",
    sustainability: {
      carbonKg: 0.9,
      materials: "100% organic cotton",
      packaging: "Plastic-free paper tag",
      recyclable: true,
      origin: "India",
      certifications: ["GOTS", "Fair Trade"],
    },
  },
  {
    id: "beeswax-food-wraps",
    name: "Beeswax Food Wraps (3 pack)",
    brand: "HiveFresh",
    image: beeswaxWraps,
    price: 549,
    category: "Kitchen",
    ecoScore: "A",
    rating: 4.5,
    description:
      "Reusable wraps made from cotton, beeswax and tree resin. A natural alternative to cling film.",
    sustainability: {
      carbonKg: 0.4,
      materials: "Organic cotton, beeswax, jojoba oil",
      packaging: "Kraft paper sleeve",
      recyclable: false,
      origin: "India",
      certifications: ["Compostable"],
    },
  },
  {
    id: "solar-power-bank",
    name: "Solar Power Bank 10000mAh",
    brand: "SunCharge",
    image: solarPowerbank,
    price: 1899,
    category: "Electronics",
    ecoScore: "B",
    rating: 4.3,
    description:
      "Rugged power bank with a built-in solar panel. Charge your phone anywhere using clean energy.",
    sustainability: {
      carbonKg: 6.5,
      materials: "Recycled ABS, monocrystalline panel",
      packaging: "Recycled cardboard",
      recyclable: true,
      origin: "China",
      certifications: ["RoHS"],
    },
  },
  {
    id: "recycled-notebook",
    name: "Recycled Paper Notebook",
    brand: "PaperLeaf",
    image: recycledNotebook,
    price: 199,
    category: "Stationery",
    ecoScore: "B",
    rating: 4.4,
    description:
      "A5 notebook with 160 pages of 100% recycled paper and a kraft cover tied with jute twine.",
    sustainability: {
      carbonKg: 0.6,
      materials: "Recycled paper, jute twine",
      packaging: "None",
      recyclable: true,
      origin: "India",
      certifications: ["FSC Recycled"],
    },
  },
  {
    id: "natural-loofah",
    name: "Natural Loofah Sponges",
    brand: "PureRoots",
    image: loofah,
    price: 249,
    category: "Home",
    ecoScore: "A",
    rating: 4.5,
    description:
      "Plant-grown loofah sponges for dishes or bath. Fully compostable at the end of their life.",
    sustainability: {
      carbonKg: 0.1,
      materials: "Luffa plant fibre",
      packaging: "Paper band",
      recyclable: true,
      origin: "India",
      certifications: ["Compostable"],
    },
  },
  {
    id: "organic-cotton-tshirt",
    name: "Organic Cotton T-Shirt",
    brand: "EarthWear",
    image: organicTshirt,
    price: 799,
    category: "Fashion",
    ecoScore: "B",
    rating: 4.6,
    description:
      "Soft everyday tee made from organic cotton grown without synthetic pesticides.",
    sustainability: {
      carbonKg: 2.4,
      materials: "100% organic cotton",
      packaging: "Recycled paper mailer",
      recyclable: true,
      origin: "India",
      certifications: ["GOTS"],
    },
  },
  {
    id: "led-smart-bulb",
    name: "LED Smart Bulb 9W",
    brand: "Lumio",
    image: ledBulb,
    price: 649,
    category: "Electronics",
    ecoScore: "C",
    rating: 4.2,
    description:
      "Energy-efficient smart bulb using 85% less power than incandescent bulbs, with app control.",
    sustainability: {
      carbonKg: 3.2,
      materials: "Polycarbonate, aluminium, electronics",
      packaging: "Cardboard with plastic insert",
      recyclable: false,
      origin: "China",
      certifications: ["Energy Star"],
    },
  },
  {
    id: "plant-dish-soap",
    name: "Plant-Based Dish Soap",
    brand: "Pure Earth",
    image: dishSoap,
    price: 329,
    category: "Home",
    ecoScore: "B",
    rating: 4.4,
    description:
      "Biodegradable dish soap made from plant-derived surfactants in a refillable glass bottle.",
    sustainability: {
      carbonKg: 0.8,
      materials: "Plant surfactants, glass bottle",
      packaging: "Refillable glass",
      recyclable: true,
      origin: "India",
      certifications: ["Cruelty-Free", "Vegan"],
    },
  },
  {
    id: "polyester-puffer-jacket",
    name: "Glossy Polyester Puffer Jacket",
    brand: "FastTrend",
    image: polyesterJacket,
    price: 2499,
    category: "Fashion",
    ecoScore: "E",
    rating: 3.9,
    description:
      "Trendy puffer jacket made from virgin polyester. Warm, but sheds microplastics and is hard to recycle.",
    sustainability: {
      carbonKg: 18.5,
      materials: "Virgin polyester, synthetic fill",
      packaging: "Plastic poly bag",
      recyclable: false,
      origin: "Bangladesh",
      certifications: [],
    },
  },
  {
    id: "plastic-cutlery-pack",
    name: "Disposable Plastic Cutlery (60 pc)",
    brand: "QuickServe",
    image: plasticCutlery,
    price: 149,
    category: "Kitchen",
    ecoScore: "F",
    rating: 3.2,
    description:
      "Single-use plastic forks, spoons and knives. Convenient, but ends up in landfills and oceans.",
    sustainability: {
      carbonKg: 1.6,
      materials: "Polystyrene plastic",
      packaging: "Plastic wrap",
      recyclable: false,
      origin: "India",
      certifications: [],
    },
  },
  {
    id: "coconut-shell-bowls",
    name: "Coconut Shell Bowls (Set of 2)",
    brand: "CocoCraft",
    image: coconutBowls,
    price: 699,
    category: "Kitchen",
    ecoScore: "A",
    rating: 4.8,
    description:
      "Handcrafted from discarded coconut shells, finished with coconut oil, with matching wooden spoons.",
    sustainability: {
      carbonKg: 0.3,
      materials: "Upcycled coconut shell, palm wood",
      packaging: "Jute pouch",
      recyclable: true,
      origin: "Kerala, India",
      certifications: ["Handmade", "Fair Trade"],
    },
  },
  {
    id: "herbal-shampoo-bar",
    name: "Lavender Herbal Shampoo Bar",
    brand: "BareLeaf",
    image: shampooBar,
    price: 399,
    category: "Personal Care",
    ecoScore: "A",
    rating: 4.6,
    description:
      "Solid shampoo bar with lavender and rosemary. Lasts as long as 3 plastic bottles of shampoo.",
    sustainability: {
      carbonKg: 0.2,
      materials: "Plant oils, essential oils",
      packaging: "Compostable paper",
      recyclable: true,
      origin: "India",
      certifications: ["Vegan", "Palm-Oil Free"],
    },
  },
  {
    id: "wireless-earbuds",
    name: "Wireless Earbuds Pro",
    brand: "SonicX",
    image: earbuds,
    price: 2999,
    category: "Electronics",
    ecoScore: "D",
    rating: 4.1,
    description:
      "Noise-cancelling earbuds with 30h battery. Non-replaceable batteries make them hard to repair.",
    sustainability: {
      carbonKg: 9.8,
      materials: "Plastic, lithium-ion battery",
      packaging: "Plastic tray in box",
      recyclable: false,
      origin: "China",
      certifications: [],
    },
  },
  {
    id: "cork-yoga-mat",
    name: "Natural Cork Yoga Mat",
    brand: "ZenGround",
    image: corkYogaMat,
    price: 2199,
    category: "Fitness",
    ecoScore: "B",
    rating: 4.7,
    description:
      "Non-slip cork surface on a natural rubber base. Antimicrobial and free from PVC.",
    sustainability: {
      carbonKg: 4.1,
      materials: "Cork, natural tree rubber",
      packaging: "Cotton strap, no box",
      recyclable: true,
      origin: "Portugal",
      certifications: ["PVC-Free"],
    },
  },
  {
    id: "plant-fiber-phone-case",
    name: "Plant-Fibre Phone Case",
    brand: "Shellter",
    image: phoneCase,
    price: 999,
    category: "Electronics",
    ecoScore: null,
    rating: 4.0,
    description:
      "Speckled phone case claimed to be made from plant fibres. The brand has not shared verified sustainability data yet.",
    sustainability: null,
  },
  {
    id: "vanilla-scented-candle",
    name: "Vanilla Scented Candle",
    brand: "River & Pine",
    image: scentedCandle,
    price: 849,
    category: "Home",
    ecoScore: null,
    rating: 4.3,
    description:
      "Hand-poured candle in an amber glass jar with a wooden lid. Sustainability information is not available.",
    sustainability: null,
  },
];

export const MAX_PRICE = Math.max(...products.map((p) => p.price));

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export interface ProductFilters {
  query: string;
  categories: string[];
  maxPrice: number;
  ecoScores: EcoScore[];
  includeUnknown: boolean;
}

/** Applies search + category + price + eco-score filters. */
export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((p) => {
    if (q && !`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (p.price > f.maxPrice) return false;
    if (f.ecoScores.length || !f.includeUnknown) {
      if (p.ecoScore === null) return f.includeUnknown;
      if (f.ecoScores.length && !f.ecoScores.includes(p.ecoScore)) return false;
    }
    return true;
  });
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
