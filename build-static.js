const fs = require('fs');
const path = require('path');

// Since we can't easily import TypeScript modules in Node.js directly,
// we'll create a simplified version that just copies the posts
async function buildStatic() {
  console.log('Generating static data...');

  try {
    // Read posts directory
    const postsDir = path.join(process.cwd(), 'src/posts');
    const posts = [];

    if (fs.existsSync(postsDir)) {
      const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

      for (const file of files) {
        const content = fs.readFileSync(path.join(postsDir, file), 'utf8');

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const metadata = {};

          const lines = frontmatter.split('\n');
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            const [key, ...valueParts] = trimmedLine.split(':');
            if (!key || valueParts.length === 0) continue;

            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            metadata[key.trim()] = value;
          }

          posts.push({
            id: file.replace('.md', ''),
            slug: metadata.title ? metadata.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : file.replace('.md', ''),
            ...metadata
          });
        }
      }
    }

    // Create dist directory if it doesn't exist
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write posts data to JSON file
    const postsData = {
      posts: posts.sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0)),
      tags: Array.from(new Set(posts.flatMap(post => {
        if (typeof post.tags === 'string') {
          return post.tags.split(',').map(t => t.trim());
        } else if (Array.isArray(post.tags)) {
          return post.tags;
        }
        return [];
      }))),
      totalCount: posts.length
    };

    const postsDataPath = path.join(distDir, 'posts-data.json');
    fs.writeFileSync(postsDataPath, JSON.stringify(postsData, null, 2));

    console.log(`✅ Generated posts data with ${postsData.totalCount} posts`);
    console.log(`📝 Available tags: ${postsData.tags.join(', ')}`);

  } catch (error) {
    console.error('❌ Error generating static data:', error);
    process.exit(1);
  }
}

buildStatic();