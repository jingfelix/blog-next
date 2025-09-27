import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked for better markdown rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function(code: string, lang?: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Highlight.js error:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
} as any);

export interface PostMetadata {
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
}

export interface PostData extends PostMetadata {
  id: string;
  content: string;
  slug: string;
}

// Extract metadata from markdown file content
export function extractMetadata(content: string): { metadata: PostMetadata; markdownContent: string } {
  // Simple frontmatter extraction
  const metadataMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!metadataMatch) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }

  const frontmatter = metadataMatch[1];
  const markdownContent = metadataMatch[2];

  // Parse frontmatter
  const metadata: Partial<PostMetadata> = {};
  const lines = frontmatter!.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const [key, ...valueParts] = trimmedLine.split(':');
    if (!key || valueParts.length === 0) continue;

    const value = valueParts.join(':').trim();

    // Remove quotes if present
    const cleanValue = value.replace(/^["']|["']$/g, '');

    switch (key.trim()) {
      case 'title':
        metadata.title = cleanValue;
        break;
      case 'excerpt':
        metadata.excerpt = cleanValue;
        break;
      case 'author':
        metadata.author = cleanValue;
        break;
      case 'publishedDate':
        metadata.publishedDate = cleanValue;
        break;
      case 'readTime':
        metadata.readTime = cleanValue;
        break;
      case 'imageUrl':
        metadata.imageUrl = cleanValue;
        break;
      case 'tags':
        // Parse array format: ['tag1', 'tag2'] or tag1, tag2
        if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
          metadata.tags = cleanValue
            .slice(1, -1)
            .split(',')
            .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
            .filter(tag => tag);
        } else {
          metadata.tags = cleanValue.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        break;
    }
  }

  // Validate required fields
  if (!metadata.title || !metadata.excerpt || !metadata.author || !metadata.publishedDate || !metadata.readTime) {
    throw new Error('Missing required metadata fields');
  }

  // Ensure tags is always an array
  metadata.tags = metadata.tags || [];

  return {
    metadata: metadata as PostMetadata,
    markdownContent: markdownContent || ''
  };
}

// Convert markdown to HTML
export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown) as string;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}