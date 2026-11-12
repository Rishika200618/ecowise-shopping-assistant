import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Leaf, Recycle, Scale, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-eco.jpg";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/site/SearchBar";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, ECO_SCORES, products } from "@/data/products";
import { ECO_META } from "@/lib/eco";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eco-Friendly Shopping Assistant — Shop Greener" },
      {
        name: "description",
        content: "Search sustainable products, check A–F eco-scores, compare options and build your green wishlist.",
      },
      { property: "og:title", content: "Eco-Friendly Shopping Assistant — Shop Greener" },
      {
        property: "og:description",
        content: "Search sustainable products, check A–F eco-scores, compare options and build your green wishlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Leaf, title: "A–F Eco-Scores", text: "Every product is rated from A (excellent) to F (very bad) for its impact." },
  { icon: Scale, title: "Side-by-side compare", text: "Compare 2 to 5 products on price, carbon footprint and materials." },
  { icon: Heart, title: "Green wishlist", text: "Save the products you love and come back to them anytime." },
  { icon: ShieldCheck, title: "Honest data", text: "If a brand hasn't shared sustainability info, we tell you clearly." },
];

function Index() {
  const featured = products.filter((p) => p.ecoScore === "A").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 leaf-pattern opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-primary shadow-soft">
              <Recycle className="size-3.5" /> Smarter choices for a healthier planet
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-forest sm:text-5xl lg:text-6xl">
              Shop with a <em className="text-primary">clear</em> conscience.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              The Eco-Friendly Shopping Assistant shows you how green every product really is — so you can find,
              compare and save the most sustainable options in seconds.
            </p>
            <SearchBar className="mt-8 max-w-xl" />
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="py-1 text-muted-foreground">Popular:</span>
              {["Bamboo", "Bottle", "Cotton", "Solar"].map((t) => (
                <Link
                  key={t}
                  to="/products"
                  search={{ q: t }}
                  className="rounded-full bg-card px-3 py-1 font-medium text-foreground shadow-soft transition-colors hover:text-primary"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="overflow-hidden rounded-[2rem] border-8 border-card shadow-lift">
              <img
                src={heroImg}
                alt="Reusable eco-friendly products on white linen with green plants"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 shadow-lift sm:-left-6">
              <span className="grid size-11 place-items-center rounded-xl bg-eco-a font-display text-xl font-bold text-eco-ink">
                A
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{products.filter((p) => p.ecoScore === "A").length} products</p>
                <p className="text-xs text-muted-foreground">rated Excellent</p>
              </div>
            </div>
            <div className="absolute -top-4 right-4 hidden rounded-2xl bg-card px-4 py-3 shadow-lift sm:block">
              <p className="font-display text-2xl font-semibold text-primary">{products.length}+</p>
              <p className="text-xs text-muted-foreground">products rated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-forest">Browse by category</h2>
            <p className="mt-1 text-muted-foreground">Jump straight to what you need.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/products"
              search={{ category: c }}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              {c}
              <span className="ml-2 text-xs text-muted-foreground">
                {products.filter((p) => p.category === c).length}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-forest">Top-rated eco picks</h2>
            <p className="mt-1 text-muted-foreground">Products with an Eco-Score of A.</p>
          </div>
          <Button asChild variant="soft">
            <Link to="/products">
              View all products <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Eco score explainer */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-forest">How the Eco-Score works</h2>
            <p className="mt-3 text-muted-foreground">
              We rate each product on materials, packaging, carbon footprint and recyclability. The result is a
              simple letter grade with a colour you can spot at a glance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ECO_SCORES.map((s) => (
              <div key={s} className="flex items-center gap-3 rounded-2xl bg-muted p-3">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl font-display text-xl font-bold ${ECO_META[s].className}`}>
                  {s}
                </span>
                <div>
                  <p className="text-sm font-bold">{ECO_META[s].label}</p>
                  <p className="text-[11px] leading-tight text-muted-foreground">{ECO_META[s].desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl p-2">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-forest-gradient px-6 py-12 text-center text-forest-foreground sm:px-12">
          <div className="absolute inset-0 leaf-pattern opacity-20" aria-hidden />
          <h2 className="relative text-3xl font-semibold sm:text-4xl">Ready to make a greener choice?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-forest-foreground/80">
            Create a free account to keep your wishlist and start comparing products today.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="xl" className="rounded-full bg-leaf text-forest hover:bg-leaf/90">
              <Link to="/register">Create free account</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="rounded-full border-forest-foreground/30 bg-transparent text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground">
              <Link to="/products">Explore products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
