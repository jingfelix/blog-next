import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { ArticleDetail } from './components/ArticleDetail';
import { PostData } from './utils/markdown';
import { getAllPosts, getPostBySlug } from './utils/posts';

function HomePage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const loadedPosts = await getAllPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post: PostData) => {
    // 使用React Router导航
    window.history.pushState({}, '', `/post/${post.slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header showBackButton={false} />
      <PostList posts={posts} onPostClick={handlePostClick} />
    </>
  );
}

function PostDetailPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const postData = await getPostBySlug(slug);
      setPost(postData);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Post not found</h1>
          <button
            onClick={handleBackToHome}
            className="text-primary hover:underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        onBackToHome={handleBackToHome}
        showBackButton={true}
      />
      <ArticleDetail post={post} />
    </>
  );
}

function AppRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 解析当前路径
  const postMatch = currentPath.match(/^\/post\/(.+)/);

  if (postMatch) {
    return <PostDetailPage slug={postMatch[1]} />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}