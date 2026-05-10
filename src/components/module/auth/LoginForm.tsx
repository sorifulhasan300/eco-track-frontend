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
import { toast } from "sonner";
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

        {/* Divider */}
        <div className="mt-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-slate-500">or continue with</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() =>
            toast.info("Google login is an upcoming feature. Please use email login for now.")
          }
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 h-10 text-sm text-white hover:bg-white/10 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        {/* Demo Credentials */}
        <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            Demo Credentials
          </p>
          <div className="space-y-2 text-xs">
            {[
              { role: "Admin", email: "jhon@gmail.com", pass: "jhon@gmail.com" },
              { role: "Manager", email: "hasan@gmail.com", pass: "hasan@gmail.com" },
              { role: "Staff", email: "user@test.com", pass: "user@test.com" },
            ].map((c) => (
              <button
                key={c.role}
                type="button"
                onClick={() => {
                  form.setValue("email", c.email);
                  form.setValue("password", c.pass);
                  toast.success(`${c.role} credentials filled`);
                }}
                className="w-full flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-left hover:bg-white/[0.06] transition-all"
              >
                <span className="text-slate-300">
                  <span className="text-emerald-400 font-medium">{c.role}</span>{" "}
                  — {c.email}
                </span>
                <span className="text-slate-500">Copy</span>
              </button>
            ))}
          </div>
        </div>

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
