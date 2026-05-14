"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/types/product";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";

interface ProductCardProps {
  product: Product;
  onQuickOrder: (product: Product) => void;
  onView: (productId: string) => void;
}

export default function ProductCard({ product, onQuickOrder, onView }: ProductCardProps) {
  const userRole = useAuthStore((s) => s.user?.role);
  const canQuickOrder =
    userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.MANAGER || userRole === USER_ROLES.STAFF;

  const stockColor =
    product.stockLevel === 0
      ? "bg-red-500/10 text-red-300 border-red-500/20"
      : product.stockLevel < 10
      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
      : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-900/60 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-slate-900">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-slate-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {product.title}
          </h3>
        </div>

        <Badge
          variant="secondary"
          className="mb-3 w-fit bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
        >
          {product.category}
        </Badge>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">
              ${Number(product.price).toFixed(2)}
            </span>
            <Badge variant="secondary" className={stockColor}>
              {product.stockLevel === 0
                ? "Out of Stock"
                : `${product.stockLevel} in stock`}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onView(product.id)}
              variant="outline"
              className="flex-1 border-emerald-500/20 text-white bg-white/5 hover:bg-white/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            {canQuickOrder && (
              <Button
                onClick={() => onQuickOrder(product)}
                disabled={product.stockLevel === 0}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-slate-700 disabled:text-slate-400"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Quick Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
