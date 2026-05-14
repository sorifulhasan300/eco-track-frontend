"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetail } from "@/hooks/useProductsQuery";
import ProductDetailSections from "@/components/module/product/ProductDetailSections";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data, isLoading, error } = useProductDetail(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-white hover:text-emerald-400 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="bg-slate-900/60 border border-red-500/20 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Product Not Found
            </h2>
            <p className="text-slate-400">
              {error?.message || "The product you're looking for doesn't exist."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-white hover:text-emerald-400 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <ProductDetailSections product={data.data} />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        <Skeleton className="h-10 w-24 mb-6 bg-slate-800" />
        <div className="space-y-6">
          {/* Image Skeleton */}
          <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6">
            <Skeleton className="aspect-[16/9] w-full bg-slate-800 rounded-lg" />
          </div>

          {/* Product Info Skeleton */}
          <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6 space-y-4">
            <Skeleton className="h-8 w-3/4 bg-slate-800" />
            <Skeleton className="h-4 w-full bg-slate-800" />
            <Skeleton className="h-4 w-2/3 bg-slate-800" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 bg-slate-800 rounded-full" />
              <Skeleton className="h-6 w-24 bg-slate-800 rounded-full" />
            </div>
          </div>

          {/* Pricing & Stock Skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6">
              <Skeleton className="h-6 w-24 mb-4 bg-slate-800" />
              <Skeleton className="h-10 w-32 bg-slate-800" />
            </div>
            <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6">
              <Skeleton className="h-6 w-24 mb-4 bg-slate-800" />
              <Skeleton className="h-10 w-20 bg-slate-800" />
            </div>
          </div>

          {/* Location & Supplier Skeleton */}
          <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6 space-y-4">
            <Skeleton className="h-6 w-40 bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-1/2 bg-slate-800" />
            </div>
          </div>

          {/* Product Owner Skeleton */}
          <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6 space-y-4">
            <Skeleton className="h-6 w-32 bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-3/4 bg-slate-800" />
            </div>
          </div>

          {/* Timestamps Skeleton */}
          <div className="bg-slate-900/60 border border-emerald-500/20 rounded-xl p-6 space-y-4">
            <Skeleton className="h-6 w-32 bg-slate-800" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-3/4 bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
