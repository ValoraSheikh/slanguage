import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
            <LockKeyhole className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin login</CardTitle>
        </CardHeader>
        <CardContent>
          {resolvedSearchParams?.error ? (
            <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive">
              Wrong password, or ADMIN_PASSWORD is not configured.
            </div>
          ) : null}
          <form action={loginAction} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Admin password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enter moderation queue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
