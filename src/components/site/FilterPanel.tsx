import { RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CATEGORIES, ECO_SCORES, MAX_PRICE, formatPrice, type EcoScore } from "@/data/products";
import { ECO_META } from "@/lib/eco";
import { cn } from "@/lib/utils";

export interface FilterState {
  categories: string[];
  maxPrice: number;
  ecoScores: EcoScore[];
  includeUnknown: boolean;
}

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  counts: Record<string, number>;
}

export function FilterPanel({ value, onChange, onReset, counts }: Props) {
  const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-base font-bold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="h-7 text-xs text-primary">
          <RotateCcw /> Reset
        </Button>
      </div>

      <section>
        <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</h3>
        <div className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
              <Checkbox
                checked={value.categories.includes(c)}
                onCheckedChange={() => onChange({ ...value, categories: toggle(value.categories, c) })}
              />
              <span className="flex-1">{c}</span>
              <span className="text-xs text-muted-foreground">{counts[c] ?? 0}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">Max price</h3>
          <span className="text-sm font-bold text-primary">{formatPrice(value.maxPrice)}</span>
        </div>
        <Slider
          min={100}
          max={MAX_PRICE}
          step={50}
          value={[value.maxPrice]}
          onValueChange={([v]) => onChange({ ...value, maxPrice: v })}
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>₹100</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">Eco-Score</h3>
        <div className="grid grid-cols-6 gap-1.5">
          {ECO_SCORES.map((s) => {
            const active = value.ecoScores.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...value, ecoScores: toggle(value.ecoScores, s) })}
                aria-pressed={active}
                aria-label={`Eco-Score ${s}`}
                title={ECO_META[s].label}
                className={cn(
                  "grid h-10 place-items-center rounded-lg text-sm font-bold transition-all",
                  ECO_META[s].className,
                  active ? "ring-2 ring-foreground ring-offset-2" : value.ecoScores.length ? "opacity-40" : "opacity-90 hover:opacity-100",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm">
          <Checkbox
            checked={value.includeUnknown}
            onCheckedChange={(c) => onChange({ ...value, includeUnknown: c === true })}
          />
          <span>Include "Eco Data Unavailable"</span>
        </label>
      </section>
    </div>
  );
}
