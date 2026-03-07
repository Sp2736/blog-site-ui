import fs from "fs";
import path from "path";
import matter from "gray-matter";
import html from "remark-html";
import readingTime from "reading-time";
import { remark } from "remark"
import remarkSlug from "remark-slug"
import remarkAutolinkHeadings from "remark-autolink-headings"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"

const postsDirectory = path.join(process.cwd(), "src/content");

export function getPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    const slug = filename.replace(".md", "");

    const stats = readingTime(content);

    return {
      title: data.title,
      slug,
      date: data.date,
      category: data.category,
      readingTime: stats.text,
    };
  });
}

export async function getPostBySlug(slug: string) {
  const files = fs.readdirSync(postsDirectory);

  const file = files.find((f) => f.replace(".md", "") === slug);

  if (!file) return null;

  const filePath = path.join(postsDirectory, file);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
  .use(remarkSlug)
  .use(remarkAutolinkHeadings)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeStringify)
  .process(content)

  const stats = readingTime(content);

  const headings = content
  .split("\n")
  .filter((line) => line.startsWith("##"))
  .map((line) => ({
    text: line.replace(/^#+\s*/, ""),
    level: line.startsWith("###") ? 3 : 2
  }))

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    category: data.category,
    content: processedContent.toString(),
    readingTime: stats.text,
    headings,
  };
}