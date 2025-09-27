import { PostData } from '../utils/markdown';
import { BlogPostCard } from './BlogPostCard';

interface PostListProps {
  posts: PostData[];
  onPostClick: (post: PostData) => void;
}

export function PostList({ posts, onPostClick }: PostListProps) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-6 mb-20">
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Recent Articles</h2>
        <p className="text-muted-foreground max-w-2xl text-lg" style={{ fontFamily: 'Crimson Text, Georgia, serif', lineHeight: '1.7' }}>
          A curated collection of thoughtful essays on design, creativity, and the art of building meaningful digital experiences. 
          Here we explore the timeless intersection of aesthetics and functionality in our ever-evolving modern world.
        </p>
      </div>
      
      <div className="grid gap-16 md:gap-20">
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            onClick={() => onPostClick(post)}
          />
        ))}
      </div>
    </main>
  );
}