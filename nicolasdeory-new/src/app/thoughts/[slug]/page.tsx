import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx-components";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} · Nicolás de Ory`,
    description:
      post.frontmatter.description ?? post.frontmatter.title,
  };
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function ThoughtPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="mb-10">
          <h1 className="font-display mb-3 text-3xl font-normal tracking-tight sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          <time
            dateTime={post.frontmatter.date}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {formatDate(post.frontmatter.date)}
          </time>
        </header>

        <div className="flex flex-col gap-4">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}
