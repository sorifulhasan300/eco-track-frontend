export interface ProductUser {
  name: string;
  email: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stockLevel: number;
  location: string;
  category: string;
  supplierId: string;
  user: ProductUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  meta: ProductMeta;
  data: Product[];
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: Product;
}

export interface ProductPayload {
  title: string;
  description: string;
  image: string;
  price: number;
  stockLevel: number;
  location: string;
  category: string;
  supplierId: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  category: string;
  reliability: number;
  basePrice: number;
  deliveryTime: string;
}

export interface SupplierResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: Supplier[];
}

export interface SingleSupplierResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: Supplier;
}

export interface SupplierPayload {
  name: string;
  contact: string;
  email: string;
  category: string;
  reliability: number;
  basePrice: number;
  deliveryTime: string;
}

export interface SupplierQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
}
