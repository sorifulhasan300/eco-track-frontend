"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, UserCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { USER_ROLES } from "@/types/roles";
import { useProfileUpdate } from "@/hooks/useProfile";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending } = useProfileUpdate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    const updateData = {
      name: data.name,
      email: data.email,
      image: data.image || undefined,
    };

    updateProfile(updateData, {
      onSuccess: () => {
        toast.success("Your profile has been successfully updated.");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const getRoleBadgeColor = (role: USER_ROLES) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case USER_ROLES.MANAGER:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case USER_ROLES.STAFF:
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-2xl w-full space-y-6">
      <div className="flex items-center gap-3">
        <UserCircle className="h-8 w-8 text-emerald-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information and preferences</p>
        </div>
      </div>

      <Card className="bg-[#0a1420] border-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Account Information
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role || USER_ROLES.STAFF)}`}>
              {user?.role}
            </span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Update your personal information and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#080f1e] border-emerald-500/20 text-white placeholder:text-slate-500"
                          placeholder="Enter your full name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-[#080f1e] border-emerald-500/20 text-white placeholder:text-slate-500"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Profile Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#080f1e] border-emerald-500/20 text-white placeholder:text-slate-500"
                        placeholder="Enter profile image URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="border-emerald-500/20 text-slate-300 hover:bg-emerald-500/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
