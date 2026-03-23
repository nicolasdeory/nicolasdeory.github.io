import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectPageFrontmatter = {
  title: string;
  description?: string;
  date?: string;
};

export type ProjectPageData = {
  slug: string;
  frontmatter: ProjectPageFrontmatter;
  content: string;
};

async function readProjectFile(slug: string): Promise<string> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getProjectPageSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PROJECTS_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getProjectPageBySlug(
  slug: string,
): Promise<ProjectPageData | null> {
  try {
    const raw = await readProjectFile(slug);
    const { data, content } = matter(raw);
    const frontmatter = data as ProjectPageFrontmatter;
    if (!frontmatter.title) return null;
    return { slug, frontmatter, content };
  } catch {
    return null;
  }
}
