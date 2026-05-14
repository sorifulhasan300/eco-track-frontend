"use client";

import Image from "next/image";
import { Package, MapPin, DollarSign, Box, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductDetailSectionsProps {
  product: Product;
}

export default function ProductDetailSections({ product }: ProductDetailSectionsProps) {
  const stockColor =
    product.stockLevel === 0
      ? "bg-red-500/10 text-red-300 border-red-500/20"
      : product.stockLevel < 10
      ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
      : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";

  const stockStatus =
    product.stockLevel === 0
      ? "Out of Stock"
      : product.stockLevel < 10
      ? "Low Stock"
      : "In Stock";

  return (
    <div className="space-y-6">
      {/* Product Image Section */}
      <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-800">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="h-24 w-24 text-slate-600" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Information Section */}
      <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-xl">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{product.title}</h2>
            <p className="text-slate-400">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
              {product.category}
            </Badge>
            <Badge variant="secondary" className={stockColor}>
              {stockStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Stock Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              ${Number(product.price).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Box className="h-5 w-5 text-emerald-500" />
              Stock Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{product.stockLevel}</div>
            <p className="text-sm text-slate-400 mt-1">units available</p>
          </CardContent>
        </Card>
      </div>

      {/* Location & Supplier Section */}
      <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Location & Supplier</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div>
              <p className="text-sm text-slate-400">Location</p>
              <p className="text-white font-medium">{product.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-emerald-500 mt-0.5" />
            <div>
              <p className="text-sm text-slate-400">Supplier ID</p>
              <p className="text-white font-medium">{product.supplierId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Owner Section */}
      <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-500" />
            Product Owner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-slate-400">Name</p>
            <p className="text-white font-medium">{product.user.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="text-white font-medium">{product.user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Timestamps Section */}
      <Card className="bg-slate-900/60 border-emerald-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-500" />
            Timestamps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {product.createdAt && (
            <div>
              <p className="text-sm text-slate-400">Created At</p>
              <p className="text-white font-medium">
                {new Date(product.createdAt).toLocaleString()}
              </p>
            </div>
          )}
          {product.updatedAt && (
            <div>
              <p className="text-sm text-slate-400">Last Updated</p>
              <p className="text-white font-medium">
                {new Date(product.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
