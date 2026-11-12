import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBar({ className, initial = "" }: { className?: string; initial?: string }) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/products", search: q.trim() ? { q: q.trim() } : {} });
      }}
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-card p-1.5 pl-5 shadow-lift",
        className,
      )}
    >
      <Search className="size-5 shrink-0 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search bamboo, bottles, tote bags…"
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground sm:text-base"
      />
      <Button type="submit" variant="hero" size="xl" className="h-11 px-5 sm:px-7">
        Search
      </Button>
    </form>
  );
}
