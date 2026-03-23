import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx-components";
import {
  getProjectPageBySlug,
  getProjectPageSlugs,
} from "@/lib/project-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getProjectPageBySlug(slug);
  if (!page) return {};
  const desc =
    page.frontmatter.description ?? page.frontmatter.title;
  return {
    title: `${page.frontmatter.title} · Nicolás de Ory`,
    description: desc,
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const page = await getProjectPageBySlug(slug);
  if (!page) notFound();

  const { frontmatter, content } = page;

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <header className="mb-10">
          <h1 className="font-display mb-3 text-3xl font-normal tracking-tight sm:text-4xl">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {frontmatter.description}
            </p>
          )}
          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className="mt-3 block text-sm text-neutral-600 dark:text-neutral-400"
            >
              {formatDate(frontmatter.date)}
            </time>
          )}
        </header>

        <div className="flex flex-col gap-4">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}
