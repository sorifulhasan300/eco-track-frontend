/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/useAuthStore";
import { apiService } from "@/services/apiService";
import type { AuthResponse, LoginPayload } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { isLoading, isAuthenticated, initialize, setAuth } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginPayload) => apiService.login(values),
    onSuccess: (data: AuthResponse) => {
      setAuth(data.user, data.token);
      router.push("/");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      form.setError("root", { message });
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full max-w-md items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md border-white/10 bg-[#0f172a]/80 backdrop-blur-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-syne text-white">
          Welcome back
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.errors.root && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@company.com"
                      type="email"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-400 hover:text-emerald-300 hover:underline"
          >
            Get started
          </Link>
        </div>
        <div className="mt-3 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Home
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
