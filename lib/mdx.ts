import path from "path";
import matter from "gray-matter";
import { glob } from "glob";
import fs from "fs/promises";

const contentDirectory = path.join(process.cwd(), "content");

// Define the structure of your MDX frontmatter (adjust as needed)
export interface Frontmatter {
  title?: string;
  description?: string;
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | object
    | null
    | undefined;
}

export interface Content {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export async function getContentBySlug(slug: string) {
  const fullPath = path.join(contentDirectory, slug, "index.mdx");

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error reading file at ${fullPath}:`, error);
    return null;
  }
}

export async function getAllContent() {
  try {
    const contentPaths = await glob("*", { cwd: contentDirectory });

    const allContent = await Promise.all(
      contentPaths.map(async (contentPath) => {
        const content = await getContentBySlug(contentPath);
        return content;
      })
    );

    // Filter out any null results (in case of errors)
    return allContent.filter((content) => content !== null);
  } catch (error) {
    console.error("Error getting all content:", error);
    return [];
  }
}
