import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Leaf, LogOut, Menu, Scale, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/compare", label: "Compare" },
  { to: "/wishlist", label: "Wishlist" },
] as const;

export function Navbar() {
  const { wishlist, compare, user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const counts: Record<string, number> = { "/wishlist": wishlist.length, "/compare": compare.length };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Leaf className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-forest">EcoShop</span>
            <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">
              Eco-Friendly Shopping Assistant
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary !text-primary" }}
            >
              {l.label}
              {counts[l.to] ? (
                <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {counts[l.to]}
                </span>
              ) : null}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
                <User className="size-4" /> Hi, {user.name.split(" ")[0]}
              </span>
              <Button variant="ghost" size="icon" onClick={logout} aria-label="Log out">
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="rounded-full" onClick={() => navigate({ to: "/login" })}>
                Log in
              </Button>
              <Button variant="hero" onClick={() => navigate({ to: "/register" })}>
                Sign up
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      <div className={cn("border-t border-border bg-background md:hidden", open ? "block" : "hidden")}>
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              <span className="flex items-center gap-2">
                {l.to === "/wishlist" && <Heart className="size-4" />}
                {l.to === "/compare" && <Scale className="size-4" />}
                {l.label}
              </span>
              {counts[l.to] ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {counts[l.to]}
                </span>
              ) : null}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border pt-3">
            {user ? (
              <Button
                variant="outline"
                className="w-full rounded-full"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                <LogOut /> Log out ({user.name.split(" ")[0]})
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="flex-1 rounded-full">
                  <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                </Button>
                <Button asChild variant="hero" className="flex-1">
                  <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
