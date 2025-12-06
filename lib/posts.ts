import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(postsDir);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string) {
  const file = path.join(postsDir, `${slug}.md`);
  try {
    const source = await fs.readFile(file, 'utf8');
    const { data: frontmatter, content } = matter(source);
    const readTime = readingTime(content).text;
    return { slug, frontmatter, content, readTime };
  } catch (err) {
    return null;
  }
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getPostBySlug(s)));
  return posts.filter(Boolean) as Array<any>;
}
