import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  Bell,
  Menu,
  Package2,
  User,
  LogOut,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth, useCart, useWishlist } from "@/store";
import { categories } from "@/services/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

function IconCount({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <Badge
      variant="destructive"
      className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full text-[10px] leading-none grid place-items-center font-semibold"
    >
      {count > 99 ? "99+" : count}
    </Badge>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const wishlistCount = useWishlist((s) => s.ids.length);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-shadow",
        scrolled ? "shadow-sm border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="container-bb">
        {/* Row 1 — brand, search, actions */}
        <div className="flex items-center gap-3 sm:gap-4 h-16">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden -ms-2"
                aria-label={t("header.menu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <SheetHeader className="px-5 py-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center">
                    <Package2 className="h-4 w-4" />
                  </div>
                  Tradela
                </SheetTitle>
              </SheetHeader>
              <nav className="p-2">
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm rounded-md hover:bg-muted"
                >
                  {t("nav.marketplace")}
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm rounded-md hover:bg-muted"
                >
                  {t("nav.dashboard")}
                </Link>
                <Separator className="my-2" />
                <p className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {t("nav.categories")}
                </p>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/products?category=${c.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-muted"
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center shadow-sm">
              <Package2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Tradela</span>
          </Link>

          {/* Search */}
          <form onSubmit={onSearch} className="flex-1 max-w-2xl mx-auto hidden md:flex">
            <div className="relative w-full group">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("header.searchPlaceholder")}
                className="h-11 ps-10 pe-24 rounded-full bg-muted/60 border-transparent focus-visible:bg-background focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 transition"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-8 rounded-full px-4"
              >
                {t("header.search")}
              </Button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-0.5 ms-auto">
            <LanguageSwitcher />
            <ThemeToggle />

            <Link
              to="/dashboard/favorites"
              aria-label={t("header.wishlist")}
              className="relative p-2 rounded-md hover:bg-muted text-foreground/80 transition-colors"
            >
              <Heart className="h-5 w-5" />
              <IconCount count={wishlistCount} />
            </Link>

            <Link
              to="/dashboard"
              aria-label={t("header.cart")}
              className="relative p-2 rounded-md hover:bg-muted text-foreground/80 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <IconCount count={cartCount} />
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard/messages"
                  aria-label={t("header.messages")}
                  className="hidden sm:inline-flex p-2 rounded-md hover:bg-muted text-foreground/80"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <button
                  aria-label={t("header.notifications")}
                  className="hidden sm:inline-flex p-2 rounded-md hover:bg-muted text-foreground/80"
                >
                  <Bell className="h-5 w-5" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ms-1 h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold hover:opacity-90 transition">
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                      {user.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard"><LayoutGrid className="h-4 w-4 me-2" />{t("nav.dashboard")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/profile"><User className="h-4 w-4 me-2" />{t("header.account")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4 me-2" />{t("header.signOut")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-1 ms-1">
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">{t("header.signIn")}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">{t("header.getStarted")}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Row 2 — primary nav (desktop) */}
        <div className="hidden lg:flex items-center h-11 gap-1 -mt-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-3 text-sm gap-1.5">
                  <LayoutGrid className="h-4 w-4" />
                  {t("nav.categories")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[560px] grid-cols-2 gap-1 p-3">
                    {categories.map((c) => (
                      <li key={c.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/products?category=${c.id}`}
                            className="block rounded-md px-3 py-2.5 hover:bg-muted transition-colors"
                          >
                            <div className="text-sm font-medium leading-none">{c.name}</div>
                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {c.subcategories.slice(0, 4).join(" · ")}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              cn(
                "px-3 h-9 inline-flex items-center rounded-md text-sm transition-colors",
                isActive ? "text-foreground bg-muted" : "text-foreground/75 hover:text-foreground hover:bg-muted",
              )
            }
          >
            {t("nav.marketplace")}
          </NavLink>
          <NavLink
            to="/products?sort=deals"
            className="px-3 h-9 inline-flex items-center rounded-md text-sm text-foreground/75 hover:text-foreground hover:bg-muted"
          >
            {t("nav.deals")}
          </NavLink>
          <NavLink
            to="/products?sort=new"
            className="px-3 h-9 inline-flex items-center rounded-md text-sm text-foreground/75 hover:text-foreground hover:bg-muted"
          >
            {t("nav.newArrivals")}
          </NavLink>
          <NavLink
            to="/dashboard"
            className="px-3 h-9 inline-flex items-center rounded-md text-sm text-foreground/75 hover:text-foreground hover:bg-muted ms-auto"
          >
            {t("nav.dashboard")}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
