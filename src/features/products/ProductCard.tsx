import { Link } from "react-router-dom";
import { Star, BadgeCheck } from "lucide-react";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group card-soft overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-3.5 flex flex-col gap-2 flex-1">
        <h3 className="text-sm text-foreground line-clamp-2 leading-snug font-medium group-hover:text-primary">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground font-semibold">${product.priceMin.toFixed(2)}</span>
          <span className="text-muted-foreground text-xs">– ${product.priceMax.toFixed(2)}</span>
          <span className="text-[11px] text-muted-foreground ml-auto">/ {product.unit.toLowerCase()}</span>
        </div>
        <p className="text-xs text-muted-foreground">MOQ {product.moq} {product.unit.toLowerCase()}</p>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-auto pt-2 border-t border-border">
          <span className="flex items-center gap-1 truncate">
            {product.supplier.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
            <span className="truncate">{product.supplier.country}</span>
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
