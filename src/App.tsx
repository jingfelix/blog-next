import { useState } from 'react';
import { BlogPost } from './types/blog';
import { mockPosts } from './data/mockPosts';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { ArticleDetail } from './components/ArticleDetail';

export default function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackToHome = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onBackToHome={handleBackToHome}
        showBackButton={selectedPost !== null}
      />
      
      {selectedPost ? (
        <ArticleDetail post={selectedPost} />
      ) : (
        <PostList posts={mockPosts} onPostClick={handlePostClick} />
      )}
    </div>
  );
}