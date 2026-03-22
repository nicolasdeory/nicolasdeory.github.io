import type { Metadata } from "next";

import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Sign in · Nicolás de Ory",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const loggedIn = await getSession();
  const params = await searchParams;
  const showError = params.error === "1";

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-md px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display mb-8 text-3xl font-normal tracking-tight">
          Sign in
        </h1>

        {loggedIn ? (
          <p className="text-foreground/80">
            You are signed in.{" "}
            <a href="/api/auth/logout" className="underline">
              Sign out
            </a>
          </p>
        ) : (
          <form
            action="/api/auth/login"
            method="POST"
            className="flex flex-col gap-4"
          >
            {showError ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                Invalid credentials.
              </p>
            ) : null}
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-foreground/70">User</span>
              <input
                name="user"
                type="text"
                autoComplete="username"
                required
                className="border-foreground/20 bg-background text-foreground rounded border px-3 py-2"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-foreground/70">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="border-foreground/20 bg-background text-foreground rounded border px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="border-foreground/30 bg-foreground/5 hover:bg-foreground/10 mt-2 rounded border px-4 py-2 text-sm"
            >
              Continue
            </button>
          </form>
        )}
      </article>
    </main>
  );
}
