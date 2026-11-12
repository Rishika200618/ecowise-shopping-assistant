import { Link, useLocation } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/data/products";
import { MAX_COMPARE, MIN_COMPARE, useApp } from "@/lib/store";

export function CompareTray() {
  const { compare, toggleCompare, clearCompare } = useApp();
  const { pathname } = useLocation();
  if (compare.length === 0 || pathname === "/compare") return null;
  const items = compare.map(getProduct).filter(Boolean);
  const ready = compare.length >= MIN_COMPARE;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 animate-fade-up">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lift backdrop-blur">
        <div className="flex flex-1 items-center gap-2 overflow-x-auto">
          {items.map((p) => (
            <div key={p!.id} className="relative shrink-0">
              <img src={p!.image} alt={p!.name} className="size-12 rounded-lg border border-border object-cover" />
              <button
                onClick={() => toggleCompare(p!.id)}
                aria-label={`Remove ${p!.name} from compare`}
                className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-foreground text-background"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          <span className="hidden whitespace-nowrap pl-1 text-xs text-muted-foreground sm:inline">
            {compare.length}/{MAX_COMPARE} selected
            {!ready && ` · add ${MIN_COMPARE - compare.length} more`}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCompare} className="hidden sm:inline-flex">
          Clear
        </Button>
        {ready ? (
          <Button asChild variant="hero">
            <Link to="/compare">
              <Scale /> Compare ({compare.length})
            </Link>
          </Button>
        ) : (
          <Button variant="hero" disabled>
            <Scale /> Compare ({compare.length})
          </Button>
        )}
      </div>
    </div>
  );
}
