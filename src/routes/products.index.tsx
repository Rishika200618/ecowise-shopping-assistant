import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PackageSearch, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/site/ProductCard";
import { FilterPanel, type FilterState } from "@/components/site/FilterPanel";
import { CATEGORIES, MAX_PRICE, filterProducts, products } from "@/data/products";
import { ECO_RANK } from "@/lib/eco";

interface ProductSearch {
  q?: string;
  category?: string;
}

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category:
      typeof search.category === "string" && (CATEGORIES as readonly string[]).includes(search.category)
        ? search.category
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Products — Eco-Friendly Shopping Assistant" },
      { name: "description", content: "Browse sustainable products and filter by category, price and A–F eco-score." },
      { property: "og:title", content: "Products — Eco-Friendly Shopping Assistant" },
      { property: "og:description", content: "Browse sustainable products and filter by category, price and A–F eco-score." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

type Sort = "featured" | "price-asc" | "price-desc" | "eco";

const defaultFilters = (category?: string): FilterState => ({
  categories: category ? [category] : [],
  maxPrice: MAX_PRICE,
  ecoScores: [],
  includeUnknown: true,
});

function ProductsPage() {
  const { q, category } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const [query, setQuery] = useState(q ?? "");
  const [filters, setFilters] = useState<FilterState>(() => defaultFilters(category));
  const [sort, setSort] = useState<Sort>("featured");
  const [lastSearch, setLastSearch] = useState({ q, category });

  // Keep local state in sync when the URL changes (e.g. clicking a category link on the homepage).
  if (lastSearch.q !== q || lastSearch.category !== category) {
    setLastSearch({ q, category });
    setQuery(q ?? "");
    setFilters(defaultFilters(category));
  }

  const counts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, products.filter((p) => p.category === c).length])),
    [],
  );

  const results = useMemo(() => {
    const list = filterProducts(products, { query, ...filters });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "eco")
      sorted.sort((a, b) => (a.ecoScore ? ECO_RANK[a.ecoScore] : 9) - (b.ecoScore ? ECO_RANK[b.ecoScore] : 9));
    return sorted;
  }, [query, filters, sort]);

  const reset = () => {
    setQuery("");
    setFilters(defaultFilters());
    setSort("featured");
    navigate({ search: {}, replace: true });
  };

  const activeCount =
    filters.categories.length + filters.ecoScores.length + (filters.maxPrice < MAX_PRICE ? 1 : 0) + (filters.includeUnknown ? 0 : 1);

  const panel = <FilterPanel value={filters} onChange={setFilters} onReset={reset} counts={counts} />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-forest">All products</h1>
        <p className="mt-2 text-muted-foreground">Discover greener alternatives, rated from A to F.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sticky sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-soft">{panel}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 shadow-soft focus-within:border-primary">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands…"
                aria-label="Search products"
                className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
                  <X className="size-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-11 flex-1 rounded-full lg:hidden">
                    <SlidersHorizontal /> Filters {activeCount > 0 && `(${activeCount})`}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="pt-6">{panel}</div>
                </SheetContent>
              </Sheet>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort products"
                className="h-11 flex-1 rounded-full border border-border bg-card px-4 text-sm font-medium shadow-soft outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="eco">Best Eco-Score</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{results.length}</span> of {products.length} products
          </p>

          {results.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <PackageSearch className="size-12 text-muted-foreground" />
              <h3 className="mt-4 font-sans text-lg font-bold">No products match your filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search or reset the filters.</p>
              <Button variant="hero" className="mt-6" onClick={reset}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
