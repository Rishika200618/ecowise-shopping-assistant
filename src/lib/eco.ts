import type { EcoScore } from "@/data/products";

export const ECO_META: Record<EcoScore, { label: string; className: string; desc: string }> = {
  A: { label: "Excellent", className: "bg-eco-a text-eco-ink", desc: "Very low environmental impact" },
  B: { label: "Good", className: "bg-eco-b text-eco-ink", desc: "Low environmental impact" },
  C: { label: "Moderate", className: "bg-eco-c text-eco-ink-light", desc: "Moderate environmental impact" },
  D: { label: "Poor", className: "bg-eco-d text-eco-ink-light", desc: "High environmental impact" },
  E: { label: "Bad", className: "bg-eco-e text-eco-ink", desc: "Very high environmental impact" },
  F: { label: "Very Bad", className: "bg-eco-f text-eco-ink", desc: "Severe environmental impact" },
};

export const ECO_RANK: Record<EcoScore, number> = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 };
