import * as path from "path";
import * as fs from "fs";
import matter from "gray-matter";
import { BlogPostInfoProps } from "../components/hero/BlogPostLink";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getAllPostInfo(limit?: number): BlogPostInfoProps[] {
  const files = fs.readdirSync(postsDirectory);
  const posts = files
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDirectory, file));
      const { data } = matter(source.toString());
      return {
        title: data.title,
        description: data.description,
        url:
          data.date.getFullYear() +
          "/" +
          (data.date.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          file.replace(".mdx", ""),
        date: data.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    })
    .sort((a, b) => {
      // a and b have a date property with format "Aug 18, 2020"
      // parse it and compare the dates
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate.getTime() - aDate.getTime();
    });
  return posts.slice(0, limit ?? posts.length);
}
