import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, MessageSquare, Heart, Share2, Truck, Award, ChevronRight, BadgeCheck, Minus, Plus, Building2 } from "lucide-react";
import { products } from "@/services/mock";
import { BBButton } from "@/components/BBButton";
import { useUI } from "@/store";
import { EmptyState, ProductCardSkeleton } from "@/components/States";

export default function ProductDetail() {
  const { id } = useParams();
  const openRfq = useUI((s) => s.openRfq);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => new Promise<typeof products[number] | undefined>((r) => setTimeout(() => r(products.find((p) => p.id === id)), 300)),
  });

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(0);
  const [tab, setTab] = useState<"desc" | "spec" | "supplier">("desc");

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const tier = [...product.tiers].reverse().find((t) => qty >= t.minQty);
    return tier?.price ?? product.tiers[0].price;
  }, [product, qty]);

  if (isLoading) return (
    <div className="container-bb py-8 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7"><ProductCardSkeleton /></div>
      <div className="col-span-12 lg:col-span-5"><ProductCardSkeleton /></div>
    </div>
  );
  if (!product) return <div className="container-bb py-10"><EmptyState title="Product not found" /></div>;

  const subtotal = unitPrice * qty;
  const meetsMoq = qty >= product.moq;

  return (
    <div className="container-bb py-6">
      {/* Breadcrumb */}
      <div className="text-xs text-muted-foreground mb-5 flex items-center gap-1">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Marketplace</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Gallery */}
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2 hidden md:flex flex-col gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-md overflow-hidden bg-muted border-2 transition ${activeImg === i ? "border-primary" : "border-transparent hover:border-border"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="col-span-12 md:col-span-10">
              <div className="aspect-square rounded-xl bg-muted overflow-hidden card-soft">
                <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 text-xs rounded-md border border-border hover:border-primary hover:text-primary"><Heart className="h-4 w-4" /> Save</button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 text-xs rounded-md border border-border hover:border-primary hover:text-primary"><Share2 className="h-4 w-4" /> Share</button>
              </div>
            </div>
          </div>
        </div>

        {/* Info + Actions */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {product.supplier.verified && <span className="badge bg-primary-soft text-primary border-primary/20"><BadgeCheck className="h-3 w-3" /> Verified</span>}
              <span className="badge bg-success/10 text-success border-success/20"><Award className="h-3 w-3" /> Trade Assurance</span>
            </div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight">{product.title}</h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {product.rating.toFixed(1)} ({product.reviews})</span>
              <span>·</span>
              <span>{product.sold.toLocaleString()}+ sold</span>
            </div>
          </div>

          {/* Tier pricing */}
          <div className="card-soft p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tiered pricing</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.tiers.map((t, i) => {
                const active = qty >= t.minQty && (t.maxQty === undefined || qty <= t.maxQty);
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border text-center transition ${active ? "border-primary bg-primary-soft" : "border-border bg-surface"}`}
                  >
                    <p className="text-[11px] text-muted-foreground">
                      {t.minQty}{t.maxQty ? `–${t.maxQty}` : "+"} {product.unit.toLowerCase()}
                    </p>
                    <p className={`mt-1 font-bold ${active ? "text-primary" : "text-foreground"}`}>${t.price.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity & total */}
          <div className="card-soft p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Quantity ({product.unit})</p>
                <div className="flex items-center mt-1.5">
                  <button onClick={() => setQty((q) => Math.max(0, q - 50))} className="h-10 w-10 rounded-l-md border border-border grid place-items-center hover:bg-muted"><Minus className="h-4 w-4" /></button>
                  <input
                    type="number"
                    min={0}
                    value={qty || ""}
                    onChange={(e) => setQty(+e.target.value || 0)}
                    placeholder={String(product.moq)}
                    className="w-24 h-10 border-y border-border text-center text-sm outline-none focus:border-primary"
                  />
                  <button onClick={() => setQty((q) => q + 50)} className="h-10 w-10 rounded-r-md border border-border grid place-items-center hover:bg-muted"><Plus className="h-4 w-4" /></button>
                </div>
                <p className="text-xs mt-1.5 text-muted-foreground">MOQ: {product.moq} {product.unit.toLowerCase()}</p>
                {!meetsMoq && qty > 0 && <p className="text-xs text-destructive mt-1">Below minimum order quantity</p>}
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Estimated total</p>
                <p className="text-2xl font-bold text-primary mt-1">${subtotal.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">${unitPrice.toFixed(2)} / unit</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-5">
              <BBButton full size="lg" onClick={() => openRfq(product.id)} disabled={!meetsMoq}>
                Request Quote
              </BBButton>
              <BBButton full size="lg" variant="outline" onClick={() => openRfq(product.id)}>
                <MessageSquare className="h-4 w-4" /> Chat with Supplier
              </BBButton>
            </div>
          </div>

          {/* Quick info */}
          <div className="card-soft p-5 grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Lead time</p>
              <p className="font-medium mt-0.5">15–30 days</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Shipping</p>
              <p className="font-medium mt-0.5 flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Negotiable</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="font-medium mt-0.5">T/T, L/C</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Origin</p>
              <p className="font-medium mt-0.5">{product.supplier.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-border">
          {[
            { k: "desc", l: "Description" },
            { k: "spec", l: "Specifications" },
            { k: "supplier", l: "Supplier info" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as typeof tab)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition ${tab === t.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="py-8 text-sm">
          {tab === "desc" && (
            <div className="prose prose-sm max-w-3xl text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
              <p className="mt-4">All orders are protected under Trade Assurance. Custom packaging and OEM/ODM available upon request. Bulk discounts apply for large volume orders — initiate a quote request to negotiate the final price directly with the supplier.</p>
            </div>
          )}
          {tab === "spec" && (
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl gap-x-6 gap-y-0">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border py-3 text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "supplier" && (
            <div className="card-soft p-6 max-w-2xl">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold text-xl">
                  {product.supplier.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{product.supplier.name}</p>
                    {product.supplier.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"><Building2 className="h-3 w-3" /> {product.supplier.country} · {product.supplier.years} yrs on Tradela</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border text-center">
                <div><p className="text-2xl font-bold">{product.supplier.rating}</p><p className="text-xs text-muted-foreground">Rating</p></div>
                <div><p className="text-2xl font-bold">{product.supplier.years}y</p><p className="text-xs text-muted-foreground">Experience</p></div>
                <div><p className="text-2xl font-bold">98%</p><p className="text-xs text-muted-foreground">Response rate</p></div>
              </div>
              <div className="mt-6 flex gap-2">
                <BBButton onClick={() => openRfq(product.id)}><MessageSquare className="h-4 w-4" /> Contact supplier</BBButton>
                <BBButton variant="outline">View store</BBButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
