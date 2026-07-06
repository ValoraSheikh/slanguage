import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  if (await isAdminAuthenticated()) redirect("/admin/submissions");

  return (
    <div className="container max-w-md py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>

      {resolvedSearchParams?.error ? (
        <p className="mt-4 text-sm text-destructive">
          Wrong password, or ADMIN_PASSWORD is not configured.
        </p>
      ) : null}

      <form action={loginAction} className="mt-6 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
