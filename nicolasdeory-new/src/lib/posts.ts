import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  description?: string;
};

export type PostListItem = PostFrontmatter & {
  slug: string;
};

export type PostData = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

async function readPostFile(slug: string): Promise<string> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const slugs = await getPostSlugs();
  const posts: PostListItem[] = [];

  for (const slug of slugs) {
    const raw = await readPostFile(slug);
    const { data } = matter(raw);
    const fm = data as PostFrontmatter;
    if (!fm.title || !fm.date) continue;
    posts.push({ slug, ...fm });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const raw = await readPostFile(slug);
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    if (!frontmatter.title || !frontmatter.date) return null;
    return { slug, frontmatter, content };
  } catch {
    return null;
  }
}
