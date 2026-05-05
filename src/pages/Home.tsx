import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Factory, Shirt, Home as HomeIcon, Sparkles, Car, Bike, Package, Coffee, Briefcase, BadgeCheck, MessageSquare, FileText, ShieldCheck, Zap } from "lucide-react";
import ProductCard from "@/features/products/ProductCard";
import { ProductCardSkeleton } from "@/components/States";
import { recommended, featured, categories, supplierHighlights } from "@/services/mock";
import { BBButton } from "@/components/BBButton";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Cpu, Factory, Shirt, Home: HomeIcon, Sparkles, Car, Bike, Package, Coffee, Briefcase };

export default function Home() {
  const { data: rec, isLoading } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => new Promise<typeof recommended>((r) => setTimeout(() => r(recommended), 300)),
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="container-bb relative py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary-soft px-3 py-1 rounded-full">
              <Zap className="h-3.5 w-3.5" /> 200,000+ verified suppliers
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Source smarter.<br />
              <span className="text-primary">Negotiate directly.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              The modern wholesale marketplace. Send a request, chat with the supplier, and close the deal — all in one place. No middlemen, no surprises.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products"><BBButton size="lg">Browse marketplace <ArrowRight className="h-4 w-4" /></BBButton></Link>
              <Link to="/register"><BBButton size="lg" variant="outline">Create free account</BBButton></Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Trade Assurance</div>
              <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Verified suppliers</div>
              <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Built-in negotiation</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-soft p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-sm">How sourcing works</p>
                <span className="text-xs text-muted-foreground">3 simple steps</span>
              </div>
              <div className="space-y-3">
                {[
                  { i: 1, t: "Find a product", d: "Browse 200M+ wholesale items from verified suppliers." },
                  { i: 2, t: "Request a quote", d: "Set quantity and submit — no commitment, no checkout." },
                  { i: 3, t: "Chat & negotiate", d: "Real-time chat per order until both sides agree." },
                ].map((s) => (
                  <div key={s.i} className="flex gap-3 p-3 rounded-lg bg-surface-alt/60">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-semibold shrink-0">{s.i}</div>
                    <div>
                      <p className="text-sm font-medium">{s.t}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container-bb py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Browse categories</h2>
            <p className="text-sm text-muted-foreground mt-1">Explore wholesale across major industries</p>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((c) => {
            const Icon = iconMap[c.icon] ?? Package;
            return (
              <Link
                key={c.id}
                to={`/products?category=${c.id}`}
                className="group card-soft p-5 flex flex-col items-start gap-3 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{c.subcategories.length}+ subcategories</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recommended */}
      <section className="container-bb pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recommended for you</h2>
            <p className="text-sm text-muted-foreground mt-1">Curated wholesale products from top-rated suppliers</p>
          </div>
          <Link to="/products" className="text-sm text-primary hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : rec?.slice(0, 10).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Suppliers */}
      <section className="bg-surface border-y border-border py-16">
        <div className="container-bb">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Verified suppliers</h2>
              <p className="text-sm text-muted-foreground mt-1">Trusted manufacturers, audited and rated by buyers</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplierHighlights.map((s) => (
              <div key={s.id} className="card-soft p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold text-lg shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-sm truncate">{s.name}</p>
                      {s.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.country} · {s.years} years · ⭐ {s.rating}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link to="/products" className="text-center text-xs h-9 inline-flex items-center justify-center rounded-md border border-border hover:border-primary hover:text-primary transition">View store</Link>
                  <button className="text-xs h-9 rounded-md bg-primary text-primary-foreground hover:opacity-90">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top deals */}
      <section className="container-bb py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Top deals this week</h2>
            <p className="text-sm text-muted-foreground mt-1">Best wholesale prices from leading manufacturers</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="container-bb pb-20">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-2 gap-6 items-center relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-foreground/5" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Sell wholesale on Tradela</h2>
            <p className="mt-2 text-primary-foreground/80 max-w-md">Reach millions of qualified B2B buyers worldwide. Get verified, list products, and start receiving inquiries.</p>
          </div>
          <div className="flex md:justify-end gap-3">
            <BBButton variant="accent" size="lg"><FileText className="h-4 w-4" /> Become a supplier</BBButton>
          </div>
        </div>
      </section>
    </>
  );
}
