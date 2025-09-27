import { PostData } from '../utils/markdown';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPostCardProps {
  post: PostData;
  onClick: () => void;
}

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  return (
    <article 
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      {post.imageUrl && (
        <div className="aspect-[16/9] mb-6 overflow-hidden rounded-xl bg-muted">
          <ImageWithFallback
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
          <span>{post.publishedDate}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h2 className="group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
          {post.title}
        </h2>
        
        <p className="text-muted-foreground text-lg" style={{ fontFamily: 'Crimson Text, Georgia, serif', lineHeight: '1.7' }}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border/30">
              <span className="text-xs" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm text-muted-foreground italic" style={{ fontFamily: 'Crimson Text, Georgia, serif' }}>
              by {post.author}
            </span>
          </div>
          
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border/30 transition-colors duration-200 hover:bg-accent"
                style={{ fontFamily: 'Crimson Text, Georgia, serif' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}