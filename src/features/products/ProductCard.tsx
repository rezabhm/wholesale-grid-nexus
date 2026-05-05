import { Link } from "react-router-dom";
import { Star, Shield } from "lucide-react";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-card border border-border hover:border-primary hover:shadow-sm transition-colors flex flex-col"
    >
      <div className="aspect-square bg-surface-alt overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <div className="flex items-baseline gap-1">
          <span className="text-primary font-semibold text-sm">${product.priceMin.toFixed(2)}</span>
          <span className="text-muted-foreground text-xs">- ${product.priceMax.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground">Min. order: {product.moq} {product.unit}</p>
        <h3 className="text-xs text-foreground line-clamp-2 leading-snug group-hover:text-primary">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-auto pt-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          <span>{product.rating.toFixed(1)}</span>
          <span>·</span>
          <span>{product.sold}+ sold</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground border-t border-border pt-1.5">
          {product.supplier.verified && <Shield className="h-3 w-3 text-info" />}
          <span className="truncate">{product.supplier.country}</span>
          <span>·</span>
          <span className="truncate flex-1">{product.supplier.years}yrs</span>
        </div>
      </div>
    </Link>
  );
}
