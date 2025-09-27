const fs = require('fs');
const path = require('path');

async function generateStaticPages() {
  console.log('Generating static pages...');

  try {
    // 读取posts数据
    const postsDataPath = path.join(process.cwd(), 'dist', 'posts-data.json');
    if (!fs.existsSync(postsDataPath)) {
      console.error('posts-data.json not found. Run build first.');
      process.exit(1);
    }

    const postsData = JSON.parse(fs.readFileSync(postsDataPath, 'utf8'));

    // 创建基础HTML模板
    const indexHtmlPath = path.join(process.cwd(), 'dist', 'index.html');
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    // 为每篇文章创建独立的HTML文件
    for (const post of postsData.posts) {
      const postHtml = createPostPage(indexHtml, post);
      const postPagePath = path.join(process.cwd(), 'dist', 'post', `${post.slug}.html`);

      // 确保目录存在
      const postDir = path.dirname(postPagePath);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }

      fs.writeFileSync(postPagePath, postHtml);
      console.log(`✅ Generated: /post/${post.slug}.html`);
    }

    // 创建404页面
    const notFoundHtml = createNotFoundPage(indexHtml);
    const notFoundPath = path.join(process.cwd(), 'dist', '404.html');
    fs.writeFileSync(notFoundPath, notFoundHtml);
    console.log('✅ Generated: /404.html');

    console.log(`\n🎉 Generated ${postsData.posts.length} post pages + 404 page`);

    // 生成部署说明
    const deploymentInfo = {
      homePage: 'index.html',
      postPages: postsData.posts.map(p => `post/${p.slug}.html`),
      notFoundPage: '404.html',
      totalPosts: postsData.posts.length,
      deployment: {
        netlify: 'Drag dist folder to Netlify',
        vercel: 'Connect GitHub repository and set build command',
        githubPages: 'Upload dist folder to gh-pages branch',
        staticHosting: 'Upload entire dist folder to any static hosting service'
      }
    };

    const infoPath = path.join(process.cwd(), 'dist', 'deployment-info.json');
    fs.writeFileSync(infoPath, JSON.stringify(deploymentInfo, null, 2));
    console.log(`📋 Generated deployment info`);

  } catch (error) {
    console.error('❌ Error generating static pages:', error);
    process.exit(1);
  }
}

function createPostPage(originalHtml, post) {
  // 处理标签数据
  const tags = Array.isArray(post.tags) ? post.tags :
               typeof post.tags === 'string' ? post.tags.split(',').map(t => t.trim()) : [];

  // 替换标题和描述
  let html = originalHtml
    .replace(/<title>.*?<\/title>/, `<title>${post.title} - The Literary Gazette</title>`)
    .replace(/<meta name="description".*?>/g, `<meta name="description" content="${post.excerpt}">`);

  // 添加Open Graph标签
  const ogTags = `
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="/post/${post.slug}.html">
    ${post.imageUrl ? `<meta property="og:image" content="${post.imageUrl}">` : ''}
    <meta property="article:author" content="${post.author}">
    <meta property="article:published_time" content="${post.publishedDate}">
    ${tags.map(tag => `<meta property="article:tag" content="${tag}">`).join('\n    ')}
  `;

  // 在head中插入Open Graph标签
  html = html.replace('</head>', `${ogTags}\n  </head>`);

  return html;
}

function createNotFoundPage(originalHtml) {
  let html = originalHtml
    .replace(/<title>.*?<\/title>/, '<title>Page Not Found - The Literary Gazette</title>')
    .replace(/<meta name="description".*?>/g, '<meta name="description" content="The page you are looking for could not be found.">');

  // 替换body内容为404页面
  const notFoundContent = `
    <div class="min-h-screen bg-background flex items-center justify-center">
      <div class="text-center max-w-2xl mx-auto px-6">
        <h1 class="text-4xl mb-4" style="font-family: 'Playfair Display', Georgia, serif; font-weight: 600;">Page Not Found</h1>
        <p class="text-xl text-muted-foreground mb-8" style="font-family: 'Crimson Text', Georgia, serif; line-height: 1.7;">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a href="/" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20" style="font-family: 'Crimson Text', Georgia, serif;">
          Back to Home
        </a>
      </div>
    </div>
  `;

  html = html.replace(/<body>.*?<\/body>/s, `<body>${notFoundContent}</body>`);

  return html;
}

generateStaticPages();