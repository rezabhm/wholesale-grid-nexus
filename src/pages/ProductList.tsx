import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid, List, PackageX } from "lucide-react";
import ProductCard from "@/features/products/ProductCard";
import { ProductCardSkeleton, EmptyState } from "@/components/States";
import { products, categories } from "@/services/mock";

const countries = ["China", "India", "Turkey", "Vietnam", "South Korea"];
const moqOptions = [50, 100, 200, 500, 1000];

export default function ProductList() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("category") ?? "";
  const q = params.get("q") ?? "";

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [moq, setMoq] = useState<number | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [sort, setSort] = useState("popular");

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => new Promise<typeof products>((r) => setTimeout(() => r(products), 400)),
  });

  const filtered = useMemo(() => {
    let list = data ?? [];
    if (cat) list = list.filter((p) => p.category === cat);
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    if (priceMin) list = list.filter((p) => p.priceMax >= +priceMin);
    if (priceMax) list = list.filter((p) => p.priceMin <= +priceMax);
    if (moq) list = list.filter((p) => p.moq <= moq);
    if (country) list = list.filter((p) => p.supplier.country === country);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceMin - b.priceMin);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceMin - a.priceMin);
    if (sort === "popular") list = [...list].sort((a, b) => b.sold - a.sold);
    return list;
  }, [data, cat, q, priceMin, priceMax, moq, country, sort]);

  return (
    <div className="container-bb py-4">
      {/* Breadcrumb */}
      <div className="text-xs text-muted-foreground mb-3">
        Home / Products {cat && `/ ${categories.find((c) => c.id === cat)?.name}`}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar filters */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-card border border-border">
            <div className="p-3 border-b border-border flex items-center gap-2 font-semibold text-sm">
              <Filter className="h-4 w-4" /> Filters
            </div>

            <FilterGroup title="Category">
              <button onClick={() => setParams({})} className={`block w-full text-left text-xs py-1 hover:text-primary ${!cat ? "text-primary font-medium" : "text-muted-foreground"}`}>All categories</button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setParams({ category: c.id })}
                  className={`block w-full text-left text-xs py-1 hover:text-primary ${cat === c.id ? "text-primary font-medium" : "text-foreground"}`}
                >
                  {c.name}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Price (USD)">
              <div className="flex gap-2 items-center">
                <input value={priceMin} onChange={(e) => setPriceMin(e.target.value)} type="number" placeholder="Min" className="w-full border border-border h-8 px-2 text-xs outline-none focus:border-primary" />
                <span className="text-muted-foreground">-</span>
                <input value={priceMax} onChange={(e) => setPriceMax(e.target.value)} type="number" placeholder="Max" className="w-full border border-border h-8 px-2 text-xs outline-none focus:border-primary" />
              </div>
            </FilterGroup>

            <FilterGroup title="Min. Order Quantity">
              {moqOptions.map((m) => (
                <label key={m} className="flex items-center gap-2 text-xs py-0.5 cursor-pointer">
                  <input type="radio" name="moq" checked={moq === m} onChange={() => setMoq(m)} className="accent-primary" />
                  ≤ {m} pieces
                </label>
              ))}
              {moq && <button onClick={() => setMoq(null)} className="text-xs text-primary mt-1">Clear</button>}
            </FilterGroup>

            <FilterGroup title="Supplier Country">
              {countries.map((c) => (
                <label key={c} className="flex items-center gap-2 text-xs py-0.5 cursor-pointer">
                  <input type="radio" name="country" checked={country === c} onChange={() => setCountry(c)} className="accent-primary" />
                  {c}
                </label>
              ))}
              {country && <button onClick={() => setCountry(null)} className="text-xs text-primary mt-1">Clear</button>}
            </FilterGroup>
          </div>
        </aside>

        {/* Main */}
        <section className="col-span-12 lg:col-span-9">
          <div className="bg-card border border-border p-3 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              {[
                { v: "popular", l: "Popular" },
                { v: "price-asc", l: "Price ↑" },
                { v: "price-desc", l: "Price ↓" },
              ].map((s) => (
                <button
                  key={s.v}
                  onClick={() => setSort(s.v)}
                  className={`px-3 h-8 border ${sort === s.v ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}
                >
                  {s.l}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{filtered.length} results</span>
              <Grid className="h-4 w-4" />
              <List className="h-4 w-4 opacity-50" />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No products match your filters" description="Try removing some filters or browsing other categories." icon={PackageX} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 border-b border-border last:border-0">
      <h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground mb-2">{title}</h4>
      <div className="space-y-1 max-h-56 overflow-auto">{children}</div>
    </div>
  );
}
