"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/product";
import { useCreateOrder } from "@/hooks/useOrders";

interface QuickOrderModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuickOrderModal({
  product,
  open,
  onOpenChange,
}: QuickOrderModalProps) {
  const [quantity, setQuantity] = useState(1);
  const createOrder = useCreateOrder();

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return Number(product.price) * quantity;
  }, [product, quantity]);

  const isValid = useMemo(() => {
    if (!product) return false;
    return quantity >= 1 && quantity <= product.stockLevel;
  }, [quantity, product]);

  const handleConfirm = () => {
    if (!product || !isValid) return;

    createOrder.mutate(
      { items: [{ productId: product.id, quantity }] },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");
          setQuantity(1);
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to place order");
        },
      }
    );
  };

  const handleQuantityChange = (value: string) => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      setQuantity(1);
      return;
    }
    setQuantity(num);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-emerald-500/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Order</DialogTitle>
          <DialogDescription className="text-slate-400">
            Place a direct order for {product.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Product Info */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="text-slate-300">Unit Price</span>
            <span className="text-lg font-semibold text-white">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-slate-300">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={product.stockLevel}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="bg-transparent border-emerald-500/20 text-white"
            />
            <p className="text-xs text-slate-400">
              Available stock: {product.stockLevel}
            </p>
          </div>

          {/* Validation messages */}
          {quantity < 1 && (
            <p className="text-sm text-red-400">
              Quantity must be at least 1
            </p>
          )}
          {quantity > product.stockLevel && (
            <p className="text-sm text-red-400">
              Cannot order more than available stock ({product.stockLevel})
            </p>
          )}

          {/* Total */}
          <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
            <span className="text-emerald-300 font-medium">Total Price</span>
            <span className="text-xl font-bold text-emerald-400">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setQuantity(1);
              onOpenChange(false);
            }}
            className="text-white border-emerald-500/20 bg-white/5 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValid || createOrder.isPending}
            className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-slate-700 disabled:text-slate-400"
          >
            {createOrder.isPending ? "Placing Order..." : "Confirm Order"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
