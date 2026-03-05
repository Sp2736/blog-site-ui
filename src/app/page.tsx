export const dynamic = "force-dynamic";
import { getPosts } from '@/lib/posts';
import { BlogFeed } from '@/components/blog-feed';
import { BlogPost } from '@/lib/types';

export default async function Home() {
  const posts: BlogPost[] = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogFeed posts={posts} />
    </div>
  );
}
