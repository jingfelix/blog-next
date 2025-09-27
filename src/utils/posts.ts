import { PostData, extractMetadata, markdownToHtml, generateSlug, formatDate } from './markdown';

// Import all markdown files using Vite's import.meta.glob
const markdownFiles = import.meta.glob<string>('../posts/*.md', { as: 'raw' });

export async function getAllPosts(): Promise<PostData[]> {
  const posts: PostData[] = [];

  for (const path in markdownFiles) {
    try {
      const content = await markdownFiles[path]();
      const { metadata, markdownContent } = extractMetadata(content);

      // Generate ID and slug from filename
      const fileName = path.split('/').pop()?.replace('.md', '') || '';
      const slug = generateSlug(metadata.title);

      const htmlContent = markdownToHtml(markdownContent);

      posts.push({
        id: fileName,
        slug,
        content: htmlContent,
        ...metadata,
      });
    } catch (error) {
      console.error(`Error loading post ${path}:`, error);
    }
  }

  // Sort by publish date (newest first)
  return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getPostById(id: string): Promise<PostData | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// For static site generation - export posts data
export async function generatePostsData() {
  const posts = await getAllPosts();

  return {
    posts: posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      publishedDate: post.publishedDate,
      readTime: post.readTime,
      tags: post.tags,
      imageUrl: post.imageUrl,
    })),
    tags: Array.from(new Set(posts.flatMap(post => post.tags))),
    totalCount: posts.length,
  };
}