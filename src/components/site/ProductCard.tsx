import { Link } from "@tanstack/react-router";
import { Check, Heart, Scale, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { EcoBadge } from "./EcoBadge";

export function ProductCard({ product }: { product: Product }) {
  const { isWishlisted, toggleWishlist, isComparing, toggleCompare } = useApp();
  const saved = isWishlisted(product.id);
  const comparing = isComparing(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={816}
          height={816}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <EcoBadge score={product.ecoScore} size="sm" showLabel={false} />
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        className={cn(
          "absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur transition-colors hover:bg-card",
          saved ? "text-eco-f" : "text-muted-foreground",
        )}
      >
        <Heart className={cn("size-4", saved && "fill-current")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 font-semibold text-secondary-foreground">
            {product.category}
          </span>
          <span className="flex items-center gap-1 font-medium text-muted-foreground">
            <Star className="size-3.5 fill-eco-c text-eco-c" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="line-clamp-2 font-sans text-[15px] font-bold leading-snug text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-display text-xl font-semibold text-forest">{formatPrice(product.price)}</span>
          {product.sustainability && (
            <span className="text-xs font-medium text-muted-foreground">{product.sustainability.carbonKg} kg CO₂e</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          aria-pressed={comparing}
          className={cn(
            "mt-1 flex h-9 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors",
            comparing
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground hover:border-primary hover:text-primary",
          )}
        >
          {comparing ? <Check className="size-4" /> : <Scale className="size-4" />}
          {comparing ? "Added to compare" : "Compare"}
        </button>
      </div>
    </article>
  );
}
