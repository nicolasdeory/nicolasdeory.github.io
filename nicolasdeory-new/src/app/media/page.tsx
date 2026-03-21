import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media · Nicolás de Ory",
  description: "Media",
};

export default function MediaPage() {
  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display mb-8 text-3xl font-normal tracking-tight sm:mb-10 sm:text-4xl">
          Photographs
        </h1>
        <p>Work in progress!</p>
      </article>
    </main>
  );
}
