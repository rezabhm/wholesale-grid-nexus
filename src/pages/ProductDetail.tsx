import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, Shield, MessageSquare, Heart, Share2, Truck, Award, ChevronRight } from "lucide-react";
import { products } from "@/services/mock";
import { BBButton } from "@/components/BBButton";
import { useUI } from "@/store";
import { EmptyState } from "@/components/States";

export default function ProductDetail() {
  const { id } = useParams();
  const openRfq = useUI((s) => s.openRfq);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => new Promise<typeof products[number] | undefined>((r) => setTimeout(() => r(products.find((p) => p.id === id)), 300)),
  });

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(0);
  const [tab, setTab] = useState<"desc" | "spec" | "rev">("desc");

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const tier = [...product.tiers].reverse().find((t) => qty >= t.minQty);
    return tier?.price ?? product.tiers[0].price;
  }, [product, qty]);

  if (isLoading) return <div className="container-bb py-10">Loading...</div>;
  if (!product) return <div className="container-bb py-10"><EmptyState title="Product not found" /></div>;

  const subtotal = unitPrice * qty;
  const meetsMoq = qty >= product.moq;

  return (
    <div className="container-bb py-4">
      {/* Breadcrumb */}
      <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Gallery */}
        <div className="col-span-12 lg:col-span-5">
          <div className="aspect-square bg-surface-alt border border-border overflow-hidden">
            <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square border bg-surface-alt overflow-hidden ${activeImg === i ? "border-primary border-2" : "border-border"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 flex items-center justify-center gap-1 border border-border py-2 text-xs hover:bg-surface-alt"><Heart className="h-4 w-4" /> Save</button>
            <button className="flex-1 flex items-center justify-center gap-1 border border-border py-2 text-xs hover:bg-surface-alt"><Share2 className="h-4 w-4" /> Share</button>
          </div>
        </div>

        {/* Info */}
        <div className="col-span-12 lg:col-span-4">
          <h1 className="text-xl font-semibold leading-snug">{product.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {product.rating.toFixed(1)} ({product.reviews})</span>
            <span>·</span>
            <span>{product.sold}+ sold</span>
          </div>

          {/* Tier price table */}
          <div className="mt-4 border border-border">
            <div className="bg-surface-alt px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tiered pricing</div>
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs text-muted-foreground">
                <tr>
                  <th className="text-left p-3 font-medium border-b border-border">Quantity ({product.unit})</th>
                  <th className="text-right p-3 font-medium border-b border-border">Price per unit</th>
                </tr>
              </thead>
              <tbody>
                {product.tiers.map((t, i) => {
                  const active = qty >= t.minQty && (t.maxQty === undefined || qty <= t.maxQty);
                  return (
                    <tr key={i} className={`border-b border-border last:border-0 ${active ? "bg-accent" : ""}`}>
                      <td className="p-3">
                        {t.minQty}{t.maxQty ? ` - ${t.maxQty}` : "+"}
                      </td>
                      <td className="p-3 text-right font-semibold text-primary">${t.price.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Min. order:</span><span className="font-medium">{product.moq} {product.unit}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Lead time:</span><span className="font-medium">15-30 days</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span className="font-medium">T/T, L/C, Western Union</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-foreground">Shipping:</span><span className="font-medium flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Negotiable</span></div>
          </div>
        </div>

        {/* Right: action panel */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-card border border-border p-4 sticky top-32">
            <div className="text-xs text-muted-foreground">Your order</div>

            <label className="block mt-3">
              <span className="text-xs text-muted-foreground">Quantity</span>
              <div className="flex mt-1">
                <input
                  type="number"
                  min={0}
                  value={qty || ""}
                  onChange={(e) => setQty(+e.target.value || 0)}
                  placeholder={String(product.moq)}
                  className="flex-1 border border-border h-10 px-3 text-sm outline-none focus:border-primary"
                />
                <span className="bg-surface-alt border border-l-0 border-border px-3 flex items-center text-xs text-muted-foreground">{product.unit}</span>
              </div>
              {!meetsMoq && qty > 0 && (
                <p className="text-xs text-destructive mt-1">Below MOQ ({product.moq} {product.unit})</p>
              )}
            </label>

            <div className="mt-4 p-3 bg-surface border border-border">
              <div className="flex justify-between text-xs"><span className="text-muted-foreground">Unit price</span><span className="font-semibold">${unitPrice.toFixed(2)}</span></div>
              <div className="flex justify-between mt-2 text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-bold text-primary text-base">${subtotal.toFixed(2)}</span></div>
            </div>

            <div className="space-y-2 mt-4">
              <BBButton full onClick={() => openRfq(product.id)} disabled={!meetsMoq}>Start Order</BBButton>
              <BBButton full variant="outline" onClick={() => openRfq(product.id)}>
                <MessageSquare className="h-4 w-4" /> Contact Supplier
              </BBButton>
            </div>

            {/* Supplier card */}
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">{product.supplier.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.supplier.name}</p>
                  <p className="text-xs text-muted-foreground">{product.supplier.country} · {product.supplier.years} yrs</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs">
                {product.supplier.verified && <span className="flex items-center gap-1 text-info"><Shield className="h-3 w-3" /> Verified</span>}
                <span className="flex items-center gap-1 text-muted-foreground"><Award className="h-3 w-3" /> Trade Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-t border-border">
        <div className="flex gap-1 border-b border-border">
          {[
            { k: "desc", l: "Description" },
            { k: "spec", l: "Specifications" },
            { k: "rev", l: `Reviews (${product.reviews})` },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as typeof tab)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px ${tab === t.k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="py-6 text-sm">
          {tab === "desc" && <p className="text-muted-foreground leading-relaxed max-w-3xl">{product.description}</p>}
          {tab === "spec" && (
            <table className="w-full max-w-3xl border border-border">
              <tbody>
                {product.specs.map((s) => (
                  <tr key={s.label} className="border-b border-border last:border-0">
                    <td className="bg-surface-alt p-3 w-1/3 text-muted-foreground">{s.label}</td>
                    <td className="p-3">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "rev" && (
            <div className="space-y-4 max-w-3xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-surface-alt rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Buyer #{i * 423}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> 5.0</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">Great quality and very responsive supplier. Items arrived as described, packaging was solid. Will reorder for our next batch.</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
