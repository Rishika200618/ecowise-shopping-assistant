import { Leaf, CircleHelp } from "lucide-react";
import type { EcoScore } from "@/data/products";
import { ECO_META } from "@/lib/eco";
import { cn } from "@/lib/utils";

interface Props {
  score: EcoScore | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function EcoBadge({ score, size = "md", showLabel = true, className }: Props) {
  if (!score) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-eco-na font-semibold text-muted-foreground",
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
          className,
        )}
        title="This product has no verified sustainability information"
      >
        <CircleHelp className="size-3.5" />
        Eco Data Unavailable
      </span>
    );
  }
  const meta = ECO_META[score];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold shadow-sm",
        meta.className,
        size === "sm" && "px-2 py-0.5 text-[11px]",
        size === "md" && "px-3 py-1 text-xs",
        size === "lg" && "px-4 py-1.5 text-sm",
        className,
      )}
      title={meta.desc}
    >
      <Leaf className={size === "lg" ? "size-4" : "size-3.5"} />
      Eco {score}
      {showLabel && <span className="font-medium opacity-90">· {meta.label}</span>}
    </span>
  );
}

/** The A–F scale with the current score highlighted. */
export function EcoScale({ score }: { score: EcoScore | null }) {
  const all: EcoScore[] = ["A", "B", "C", "D", "E", "F"];
  return (
    <div className="flex gap-1">
      {all.map((s) => (
        <span
          key={s}
          className={cn(
            "grid h-9 flex-1 place-items-center rounded-lg text-sm font-bold transition-all",
            ECO_META[s].className,
            score === s ? "scale-110 ring-2 ring-foreground ring-offset-2" : "opacity-35",
          )}
        >
          {s}
        </span>
      ))}
    </div>
  );
}
