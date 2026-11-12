import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-forest-gradient text-forest-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-leaf text-forest">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-xl font-semibold">EcoShop</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-forest-foreground/75">
            Your Eco-Friendly Shopping Assistant. Compare products by their environmental impact and make
            greener choices every day.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-leaf">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-forest-foreground/80">
            <li><Link to="/products" className="hover:text-leaf">All products</Link></li>
            <li><Link to="/compare" className="hover:text-leaf">Compare</Link></li>
            <li><Link to="/wishlist" className="hover:text-leaf">Wishlist</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-leaf">Account</h4>
          <ul className="mt-4 space-y-2 text-sm text-forest-foreground/80">
            <li><Link to="/login" className="hover:text-leaf">Log in</Link></li>
            <li><Link to="/register" className="hover:text-leaf">Create account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-foreground/10 py-5 text-center text-xs text-forest-foreground/60">
        © {new Date().getFullYear()} Eco-Friendly Shopping Assistant · Shop kind to the planet 🌱
      </div>
    </footer>
  );
}
