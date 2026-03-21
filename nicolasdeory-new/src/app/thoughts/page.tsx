import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Thoughts · Nicolás de Ory",
  description: "Thoughts and ramblings",
};

export default async function ThoughtsPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display mb-10 text-3xl font-normal tracking-tight sm:mb-12 sm:text-4xl">
          Thoughts and ramblings
        </h1>

        {posts.length === 0 ? (
          <p>
            No posts yet. Add Markdown files under{" "}
            <code className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[0.9em] dark:bg-white/10">
              content/posts/
            </code>
            .
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/thoughts/${post.slug}`}
                  className="text-[1.125rem] leading-[1.65] text-foreground"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
    </main>
  );
}
