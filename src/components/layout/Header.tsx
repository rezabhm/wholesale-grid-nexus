import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, MessageSquare, Bell, Menu, ChevronDown, Package2, LayoutGrid } from "lucide-react";
import { useAuth, useUI } from "@/store";
import { useState } from "react";
import { categories } from "@/services/mock";
import { BBButton } from "@/components/BBButton";

export default function Header() {
  const { user, logout } = useAuth();
  const setMobileMenu = useUI((s) => s.setMobileMenu);
  const mobileMenuOpen = useUI((s) => s.mobileMenuOpen);
  const [q, setQ] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="container-bb flex items-center gap-6 h-16">
        <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileMenu(!mobileMenuOpen)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center">
            <Package2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Tradela</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <div
            className="relative"
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              onMouseEnter={() => setCatOpen(true)}
              className="flex items-center gap-1.5 px-3 h-9 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted"
            >
              <LayoutGrid className="h-4 w-4" /> Categories <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full pt-2 w-[260px] z-50">
                <div className="bg-popover border border-border rounded-lg shadow-lg p-1.5">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/products?category=${c.id}`}
                      onClick={() => setCatOpen(false)}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <NavLink to="/products" className="px-3 h-9 inline-flex items-center rounded-md text-foreground/80 hover:text-foreground hover:bg-muted">Marketplace</NavLink>
          <NavLink to="/dashboard" className="px-3 h-9 inline-flex items-center rounded-md text-foreground/80 hover:text-foreground hover:bg-muted">Dashboard</NavLink>
        </nav>

        <form
          className="flex-1 max-w-xl hidden md:flex"
          onSubmit={(e) => { e.preventDefault(); nav(`/products?q=${encodeURIComponent(q)}`); }}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="text"
              placeholder="Search products, suppliers, categories…"
              className="w-full h-10 pl-9 pr-4 text-sm bg-muted/60 border border-transparent rounded-lg outline-none focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/15 transition"
            />
          </div>
        </form>

        <div className="flex items-center gap-1 ml-auto">
          {user ? (
            <>
              <Link to="/dashboard/messages" className="p-2 rounded-md hover:bg-muted text-foreground/80" aria-label="Messages">
                <MessageSquare className="h-5 w-5" />
              </Link>
              <button className="p-2 rounded-md hover:bg-muted text-foreground/80" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </button>
              <div className="ml-2 flex items-center gap-2">
                <Link to="/dashboard" className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </Link>
                <button onClick={logout} className="hidden sm:block text-xs text-muted-foreground hover:text-foreground">Sign out</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm px-3 h-9 inline-flex items-center rounded-md hover:bg-muted">Sign in</Link>
              <BBButton size="sm" onClick={() => nav("/register")}>Get started</BBButton>
            </>
          )}
        </div>
      </div>

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
