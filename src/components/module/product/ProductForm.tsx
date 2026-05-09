"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useProductDetail } from "@/hooks/useProductsQuery";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProductMutations";

const productSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL").or(z.literal("")),
  price: z.number().min(0, "Price must be a positive number"),
  stockLevel: z.number().int().min(0, "Stock must be a non-negative integer"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  supplierId: z.string().min(1, "Please select a supplier"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  productId?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({ productId, onSuccess, onCancel }: ProductFormProps) {
  const isEditMode = Boolean(productId);
  const { data: productDetail, isLoading: isDetailLoading } = useProductDetail(
    productId || null
  );
  const { data: suppliersData, isLoading: isSuppliersLoading } = useSuppliers();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(productId || "");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      stockLevel: 0,
      location: "",
      category: "",
      supplierId: "",
    },
  });

  useEffect(() => {
    if (isEditMode && productDetail?.data) {
      const product = productDetail.data as {
        title?: string;
        description?: string;
        image?: string;
        price?: number;
        stockLevel?: number;
        location?: string;
        category?: string;
        supplierId?: string;
      };
      form.reset({
        title: product.title || "",
        description: product.description || "",
        image: product.image || "",
        price: product.price ?? 0,
        stockLevel: product.stockLevel ?? 0,
        location: product.location || "",
        category: product.category || "",
        supplierId: product.supplierId || "",
      });
    }
  }, [isEditMode, productDetail, form]);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  function onSubmit(values: ProductFormValues) {
    const payload = values;

    if (isEditMode && productId) {
      updateMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Product updated successfully");
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update product");
        },
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Product created successfully");
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create product");
        },
      });
    }
  }

  if (isEditMode && isDetailLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
        <Skeleton className="h-8 w-full bg-emerald-500/10" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product description" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stockLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Level</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Warehouse A" {...field} className="bg-transparent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Electronics" {...field} className="bg-transparent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSuppliersLoading}
              >
                <FormControl>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suppliersData?.data?.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="text-white border-emerald-500/20 bg-white/5 hover:bg-white/10">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || isSuppliersLoading}>
            {isLoading ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
