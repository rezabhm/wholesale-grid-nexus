import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, PackageX, SlidersHorizontal, X } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(true);

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

  const activeFilters = [
    cat && { label: categories.find((c) => c.id === cat)?.name ?? cat, clear: () => setParams({}) },
    q && { label: `"${q}"`, clear: () => setParams({}) },
    moq && { label: `≤ ${moq} MOQ`, clear: () => setMoq(null) },
    country && { label: country, clear: () => setCountry(null) },
    (priceMin || priceMax) && { label: `$${priceMin || 0} – $${priceMax || "∞"}`, clear: () => { setPriceMin(""); setPriceMax(""); } },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="container-bb py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground">Marketplace {cat && `· ${categories.find((c) => c.id === cat)?.name}`}</p>
          <h1 className="text-2xl font-bold tracking-tight mt-1">
            {isLoading ? "Loading…" : `${filtered.length.toLocaleString()} products`}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3 text-sm rounded-md border border-border hover:border-primary"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 px-3 text-sm rounded-md border border-border bg-background outline-none focus:border-primary"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {activeFilters.map((f, i) => (
            <button key={i} onClick={f.clear} className="badge bg-primary-soft text-primary border-primary/20 hover:bg-primary/10">
              {f.label} <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <aside className={`col-span-12 lg:col-span-3 ${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="card-soft p-4 sticky top-20 space-y-1">
            <FilterGroup title="Category" defaultOpen>
              <button
                onClick={() => setParams({})}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-muted ${!cat ? "text-primary font-medium bg-primary-soft" : ""}`}
              >
                All categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setParams({ category: c.id })}
                  className={`block w-full text-left text-sm py-1.5 px-2 rounded hover:bg-muted ${cat === c.id ? "text-primary font-medium bg-primary-soft" : "text-foreground"}`}
                >
                  {c.name}
                </button>
              ))}
            </FilterGroup>

            <FilterGroup title="Price (USD)" defaultOpen>
              <div className="flex gap-2 items-center">
                <input value={priceMin} onChange={(e) => setPriceMin(e.target.value)} type="number" placeholder="Min" className="input-bb h-9" />
                <span className="text-muted-foreground text-xs">–</span>
                <input value={priceMax} onChange={(e) => setPriceMax(e.target.value)} type="number" placeholder="Max" className="input-bb h-9" />
              </div>
            </FilterGroup>

            <FilterGroup title="Min. order quantity">
              {moqOptions.map((m) => (
                <label key={m} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                  <input type="radio" name="moq" checked={moq === m} onChange={() => setMoq(m)} className="accent-primary" />
                  ≤ {m} pieces
                </label>
              ))}
              {moq && <button onClick={() => setMoq(null)} className="text-xs text-primary mt-1">Clear</button>}
            </FilterGroup>

            <FilterGroup title="Supplier country">
              {countries.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
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
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState title="No products match your filters" description="Try removing some filters or browsing other categories." icon={PackageX} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0 py-3">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between text-sm font-semibold">
        {title}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3 space-y-1 max-h-60 overflow-auto">{children}</div>}
    </div>
  );
}
