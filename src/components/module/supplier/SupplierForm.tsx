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
import { Skeleton } from "@/components/ui/skeleton";
import { useSupplierDetail } from "@/hooks/useSuppliersQuery";
import { useCreateSupplier, useUpdateSupplier } from "@/hooks/useSupplierMutations";

const supplierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().min(2, "Contact must be at least 2 characters"),
  email: z.string().email("Must be a valid email"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  reliability: z.number().int().min(1, "Reliability must be at least 1").max(10, "Reliability must be at most 10"),
  basePrice: z.number().min(0, "Base price must be a positive number"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;

interface SupplierFormProps {
  supplierId?: string | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SupplierForm({ supplierId, onSuccess, onCancel }: SupplierFormProps) {
  const isEditMode = Boolean(supplierId);
  const { data: supplierDetail, isLoading: isDetailLoading } = useSupplierDetail(
    supplierId || null
  );

  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier(supplierId || "");

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      category: "",
      reliability: 5,
      basePrice: 0,
      deliveryTime: "",
    },
  });

  useEffect(() => {
    if (isEditMode && supplierDetail?.data) {
      const supplier = supplierDetail.data;
      form.reset({
        name: supplier.name || "",
        contact: supplier.contact || "",
        email: supplier.email || "",
        category: supplier.category || "",
        reliability: supplier.reliability ?? 5,
        basePrice: supplier.basePrice ?? 0,
        deliveryTime: supplier.deliveryTime || "",
      });
    } else if (!isEditMode) {
      form.reset({
        name: "",
        contact: "",
        email: "",
        category: "",
        reliability: 5,
        basePrice: 0,
        deliveryTime: "",
      });
    }
  }, [isEditMode, supplierDetail, form]);

  const isLoading = createMutation.isPending || updateMutation.isPending;

  function onSubmit(values: SupplierFormValues) {
    if (isEditMode && supplierId) {
      updateMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Supplier updated successfully");
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update supplier");
        },
      });
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Supplier created successfully");
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create supplier");
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
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Supplier name" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="supplier@example.com" {...field} className="bg-transparent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8900" {...field} className="bg-transparent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Raw Materials" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="reliability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reliability (1-10)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="5"
                    value={field.value}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      field.onChange(Number.isNaN(val) ? 5 : val);
                    }}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={field.value}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      field.onChange(Number.isNaN(val) ? 0 : val);
                    }}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Time</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 3-5 business days" {...field} className="bg-transparent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading} className="text-white border-emerald-500/20 bg-white/5 hover:bg-white/10">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditMode ? "Update Supplier" : "Create Supplier"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
