import { PostData } from '../utils/markdown';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleDetailProps {
  post: PostData;
}

export function ArticleDetail({ post }: ArticleDetailProps) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <article className="space-y-8">
        {/* Article Header */}
        <header className="space-y-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
            <span>{post.publishedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="leading-tight text-4xl" style={{ fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between pt-6 pb-10 border-b border-border/30">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center border border-border/30">
                <span className="text-base" style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '600' }}>
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-base" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>{post.author}</p>
                <p className="text-sm text-muted-foreground italic" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>Author</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-full border border-border/30 transition-colors duration-200 hover:bg-accent"
                  style={{ fontFamily: 'Crimson Text, Georgia, serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-gray max-w-none space-y-8"
          style={{
            fontFamily: 'Crimson Text, Georgia, serif',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: 'var(--foreground)'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}