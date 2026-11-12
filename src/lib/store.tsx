import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export const MAX_COMPARE = 5;
export const MIN_COMPARE = 2;

interface User {
  name: string;
  email: string;
}
interface StoredUser extends User {
  passwordHash: string;
}

interface AppState {
  wishlist: string[];
  compare: string[];
  user: User | null;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const AppContext = createContext<AppState | null>(null);

const KEYS = {
  wishlist: "eco.wishlist",
  compare: "eco.compare",
  user: "eco.user",
  users: "eco.users",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function hash(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Pure helper so the compare limit rule is testable. */
export function nextCompareList(list: string[], id: string): { list: string[]; error?: string } {
  if (list.includes(id)) return { list: list.filter((x) => x !== id) };
  if (list.length >= MAX_COMPARE)
    return { list, error: `You can compare up to ${MAX_COMPARE} products at a time.` };
  return { list: [...list, id] };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWishlist(read(KEYS.wishlist, []));
    setCompare(read(KEYS.compare, []));
    setUser(read(KEYS.user, null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEYS.compare, JSON.stringify(compare));
  }, [compare, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(KEYS.user, JSON.stringify(user));
    else localStorage.removeItem(KEYS.user);
  }, [user, hydrated]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Saved to wishlist");
      return [...prev, id];
    });
  }, []);

  const toggleCompare = useCallback(
    (id: string) => {
      const res = nextCompareList(compare, id);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setCompare(res.list);
    },
    [compare],
  );

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = read<StoredUser[]>(KEYS.users, []);
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) return "An account with this email already exists.";
    const newUser: StoredUser = { name: name.trim(), email: normalized, passwordHash: await hash(password) };
    localStorage.setItem(KEYS.users, JSON.stringify([...users, newUser]));
    setUser({ name: newUser.name, email: newUser.email });
    return null;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = read<StoredUser[]>(KEYS.users, []);
    const normalized = email.trim().toLowerCase();
    const found = users.find((u) => u.email === normalized);
    if (!found || found.passwordHash !== (await hash(password))) return "Incorrect email or password.";
    setUser({ name: found.name, email: found.email });
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast("You have been logged out");
  }, []);

  const value = useMemo<AppState>(
    () => ({
      wishlist,
      compare,
      user,
      toggleWishlist,
      isWishlisted: (id) => wishlist.includes(id),
      toggleCompare,
      isComparing: (id) => compare.includes(id),
      clearCompare: () => setCompare([]),
      register,
      login,
      logout,
    }),
    [wishlist, compare, user, toggleWishlist, toggleCompare, register, login, logout],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
