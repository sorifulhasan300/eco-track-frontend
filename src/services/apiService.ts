import api from "./api";
import { USER_ROLES } from "@/types/roles";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta: null | unknown;
  data: T;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    role: USER_ROLES;
  };
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

class ApiService {
  /* ── Auth ── */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", payload);
    return response.data.data;
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/register", payload);
    return response.data.data;
  }

  /* ── Generic CRUD ── */
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await api.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.post<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.patch<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await api.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await api.delete<T>(url);
    return response.data;
  }
}

export const apiService = new ApiService();
