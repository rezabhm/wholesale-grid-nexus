import { Link } from "react-router-dom";
import { Star, BadgeCheck, Heart, ShoppingCart, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/store";
import { cn } from "@/lib/utils";

type Props = { product: Product; className?: string };

export default function ProductCard({ product, className }: Props) {
  const { t } = useTranslation();
  const wishlisted = useWishlist((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const addToCart = useCart((s) => s.add);

  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 10;
  const discount = product.discountPercent ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart({ productId: product.id, qty: product.moq });
    toast.success(t("product.addedToCart"));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-border/80",
        outOfStock && "opacity-90",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
            outOfStock && "grayscale",
          )}
        />

        {/* Top-left badges */}
        <div className="absolute top-2 start-2 flex flex-col gap-1.5 items-start">
          {discount > 0 && !outOfStock && (
            <Badge className="bg-destructive text-destructive-foreground border-0 shadow-sm font-semibold px-2 py-0.5 text-[11px]">
              -{discount}%
            </Badge>
          )}
          {product.isNew && !outOfStock && (
            <Badge className="bg-primary text-primary-foreground border-0 shadow-sm font-medium px-2 py-0.5 text-[11px]">
              {t("product.new")}
            </Badge>
          )}
          {lowStock && (
            <Badge variant="outline" className="bg-background/90 backdrop-blur text-warning border-warning/40 font-medium px-2 py-0.5 text-[11px]">
              {t("product.lowStock", { count: product.stock })}
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? t("product.removeFromWishlist") : t("product.addToWishlist")}
          className={cn(
            "absolute top-2 end-2 h-9 w-9 grid place-items-center rounded-full bg-background/90 backdrop-blur shadow-sm",
            "transition-all hover:scale-110 hover:bg-background",
            wishlisted ? "text-destructive" : "text-foreground/70",
          )}
        >
          <Heart className={cn("h-4 w-4 transition-transform", wishlisted && "fill-current")} />
        </button>

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-background/55 backdrop-blur-[1px] grid place-items-center">
            <span className="px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-semibold uppercase tracking-wide">
              {t("product.outOfStock")}
            </span>
          </div>
        )}

        {/* Quick actions — hover */}
        {!outOfStock && (
          <div className="absolute inset-x-2 bottom-2 flex gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              onClick={handleAdd}
              className="flex-1 h-9 shadow-md"
            >
              <ShoppingCart className="h-3.5 w-3.5 me-1.5" />
              {t("product.addToCart")}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 shadow-md"
              aria-label={t("product.quickView")}
              onClick={(e) => e.stopPropagation()}
              asChild
            >
              <span><Eye className="h-4 w-4" /></span>
            </Button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col gap-2 flex-1">
        <h3 className="text-sm text-foreground line-clamp-2 leading-snug font-medium group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={cn("font-semibold text-base", discount > 0 ? "text-destructive" : "text-foreground")}>
            ${product.priceMin.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-[11px] text-muted-foreground ms-auto">/ {product.unit.toLowerCase()}</span>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5">
            {product.variants.slice(0, 4).map((v) => (
              <span
                key={v.id}
                title={v.label}
                className="h-4 w-4 rounded-full border border-border ring-1 ring-background"
                style={{ backgroundColor: v.color }}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[10px] text-muted-foreground">+{product.variants.length - 4}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-auto pt-2 border-t border-border">
          <span className="flex items-center gap-1 truncate">
            {product.supplier.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
            <span className="truncate">{product.supplier.country}</span>
          </span>
          <span>{t("product.moq")} {product.moq}</span>
        </div>
      </div>
    </Link>
  );
}
