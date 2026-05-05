import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, MessageSquare, User, Menu, Globe, ChevronDown } from "lucide-react";
import { useAuth, useUI } from "@/store";
import { useState } from "react";
import { categories } from "@/services/mock";

export default function Header() {
  const { user, logout } = useAuth();
  const setMobileMenu = useUI((s) => s.setMobileMenu);
  const mobileMenuOpen = useUI((s) => s.mobileMenuOpen);
  const [q, setQ] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      {/* Top utility bar */}
      <div className="bg-surface-alt border-b border-border text-xs">
        <div className="container-bb flex h-8 items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Deliver to:</span>
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Global</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:text-primary">Buyer Center</Link>
            <Link to="/" className="hidden md:inline hover:text-primary">Help</Link>
            <span className="hidden md:inline">English-USD</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-bb flex items-center gap-4 py-3">
        <button className="lg:hidden p-2" onClick={() => setMobileMenu(!mobileMenuOpen)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="text-2xl font-bold text-primary tracking-tight">Tradela</span>
          <span className="text-[10px] text-muted-foreground hidden sm:block leading-3 ml-1">.com<br/>Wholesale</span>
        </Link>

        <form className="flex flex-1 max-w-3xl" onSubmit={(e) => { e.preventDefault(); window.location.href = `/products?q=${encodeURIComponent(q)}`; }}>
          <div className="relative flex w-full border-2 border-primary rounded-sm overflow-hidden">
            <select className="hidden sm:block bg-surface text-xs px-2 border-r border-border outline-none">
              <option>Products</option>
              <option>Suppliers</option>
              <option>Quotes</option>
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Search 200+ million products..."
              className="flex-1 px-3 py-2 text-sm outline-none bg-background"
            />
            <button type="submit" className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground px-5 flex items-center gap-1 text-sm font-medium">
              <Search className="h-4 w-4" /> <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-1 sm:gap-3 text-xs">
          <Link to="/dashboard" className="hidden sm:flex flex-col items-center hover:text-primary p-1">
            <MessageSquare className="h-5 w-5" />
            <span className="mt-0.5">Messages</span>
          </Link>
          <Link to="/dashboard" className="hidden sm:flex flex-col items-center hover:text-primary p-1">
            <ShoppingCart className="h-5 w-5" />
            <span className="mt-0.5">Orders</span>
          </Link>
          {user ? (
            <button onClick={logout} className="flex flex-col items-center hover:text-primary p-1">
              <User className="h-5 w-5" />
              <span className="mt-0.5 max-w-[80px] truncate">{user.name}</span>
            </button>
          ) : (
            <Link to="/login" className="flex flex-col items-center hover:text-primary p-1">
              <User className="h-5 w-5" />
              <span className="mt-0.5">Sign in</span>
            </Link>
          )}
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-surface border-t border-border hidden lg:block">
        <div className="container-bb flex items-center gap-1 h-10 text-sm relative">
          <button
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="flex items-center gap-1 bg-primary text-primary-foreground px-4 h-full font-medium"
          >
            <Menu className="h-4 w-4" /> All Categories <ChevronDown className="h-3 w-3" />

            {megaOpen && (
              <div className="absolute left-0 top-full bg-popover border border-border shadow-md w-[280px] text-left text-foreground z-50">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/products?category=${c.id}`}
                    className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground border-b border-border last:border-0"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </button>
          {["Featured selections", "Trade Assurance", "Buyer Central", "Help Center", "Get the app", "Become a supplier"].map((l) => (
            <NavLink key={l} to="/products" className="px-3 hover:text-primary text-foreground">{l}</NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-popover">
          {categories.slice(0, 8).map((c) => (
            <Link key={c.id} to={`/products?category=${c.id}`} onClick={() => setMobileMenu(false)} className="block px-4 py-3 border-b border-border text-sm">
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
