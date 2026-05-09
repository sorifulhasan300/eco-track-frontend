import { USER_ROLES } from "./roles";

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

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface OrderPayload {
  items: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: unknown;
}

export interface OrderItemDetail {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    title: string;
    price: number;
    category: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  totalAmount: number;
  items: OrderItemDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersMeta {
  page: number;
  limit: number;
  total: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  meta: OrdersMeta;
  data: Order[];
}

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
}

export enum ORDER_STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface UpdateOrderStatusPayload {
  status: ORDER_STATUS;
}

export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface UserDetail {
  id: string;
  email: string;
  name?: string;
  role: USER_ROLES;
  status: USER_STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface UsersMeta {
  page: number;
  limit: number;
  total: number;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: UserDetail[];
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
  sort?: string;
  sortOrder?: "asc" | "desc";
}

export interface ManageUserPayload {
  status?: USER_STATUS;
  role?: USER_ROLES;
}
