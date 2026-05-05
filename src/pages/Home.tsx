import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Factory, Shirt, Home as HomeIcon, Sparkles, Car, Bike, Package, Coffee, Briefcase, Shield, Award } from "lucide-react";
import ProductCard from "@/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/States";
import { recommended, featured, categories, banners, supplierHighlights } from "@/services/mock";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Cpu, Factory, Shirt, Home: HomeIcon, Sparkles, Car, Bike, Package, Coffee, Briefcase };

export default function Home() {
  const { data: rec, isLoading } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => new Promise<typeof recommended>((r) => setTimeout(() => r(recommended), 300)),
  });

  return (
    <>
      {/* Hero + side panels */}
      <section className="bg-surface-alt border-b border-border">
        <div className="container-bb py-4 grid grid-cols-12 gap-3">
          {/* Left categories */}
          <aside className="hidden lg:block col-span-2 bg-card border border-border">
            {categories.slice(0, 10).map((c) => {
              const Icon = iconMap[c.icon] ?? Package;
              return (
                <Link key={c.id} to={`/products?category=${c.id}`} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground border-b border-border last:border-0">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="truncate">{c.name}</span>
                </Link>
              );
            })}
          </aside>

          {/* Hero */}
          <div className="col-span-12 lg:col-span-7 relative h-[320px] overflow-hidden bg-foreground">
            <img src={banners[0].image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="relative z-10 h-full flex flex-col justify-center px-8 text-background">
              <p className="text-xs uppercase tracking-widest opacity-80">Tradela B2B Marketplace</p>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 max-w-md">{banners[0].title}</h1>
              <p className="mt-2 text-sm max-w-md opacity-90">{banners[0].subtitle}</p>
              <Link to="/products" className="mt-4 inline-flex items-center gap-1 bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground px-5 h-10 w-fit text-sm font-medium">
                {banners[0].cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right cards */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-3">
            <div className="bg-card border border-border p-4 flex-1">
              <p className="text-xs text-muted-foreground">Welcome to Tradela.com</p>
              <p className="font-semibold mt-1 text-sm">Sign in for personalized deals</p>
              <Link to="/login" className="mt-3 block text-center bg-primary text-primary-foreground py-2 text-xs font-medium hover:bg-[hsl(var(--primary-hover))]">Sign in / Register</Link>
              <Link to="/products" className="mt-2 block text-center bg-secondary text-secondary-foreground py-2 text-xs font-medium hover:bg-surface-alt border border-border">Browse products</Link>
            </div>
            <div className="bg-card border border-border p-4 flex-1">
              <div className="flex items-center gap-2 text-info text-sm font-medium"><Shield className="h-4 w-4" /> Trade Assurance</div>
              <p className="text-xs text-muted-foreground mt-2">Protections for every order placed on Tradela.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="container-bb grid grid-cols-2 md:grid-cols-4 gap-4 py-4 text-xs">
          {[
            { icon: Shield, t: "Trade Assurance", d: "Protect every order" },
            { icon: Award, t: "Verified Suppliers", d: "200,000+ verified" },
            { icon: Package, t: "Fast Logistics", d: "Door-to-door shipping" },
            { icon: Briefcase, t: "Competitive Pricing", d: "Direct from factories" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <b.icon className="h-7 w-7 text-primary" />
              <div>
                <p className="font-semibold text-foreground">{b.t}</p>
                <p className="text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container-bb py-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold">Featured categories</h2>
          <Link to="/products" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.slice(0, 10).map((c) => {
            const Icon = iconMap[c.icon] ?? Package;
            return (
              <Link key={c.id} to={`/products?category=${c.id}`} className="bg-card border border-border p-4 hover:border-primary hover:shadow-sm flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 bg-accent text-accent-foreground flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-medium leading-tight">{c.name}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recommended */}
      <section className="container-bb py-4">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold">Recommended for you</h2>
          <Link to="/products" className="text-sm text-primary hover:underline">See more →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : rec?.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Suppliers */}
      <section className="container-bb py-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold">Verified supplier highlights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {supplierHighlights.map((s) => (
            <div key={s.id} className="bg-card border border-border p-4 hover:border-primary hover:shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.country} · {s.years} yrs · ⭐ {s.rating}</p>
                </div>
                {s.verified && <Shield className="h-4 w-4 text-info" />}
              </div>
              <div className="mt-3 flex gap-2">
                <Link to="/products" className="flex-1 text-center text-xs bg-secondary border border-border py-1.5 hover:bg-surface-alt">View store</Link>
                <button className="flex-1 text-xs bg-primary text-primary-foreground py-1.5 hover:bg-[hsl(var(--primary-hover))]">Contact</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-bb py-4">
        <h2 className="text-xl font-bold mb-4">Top deals this week</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}
