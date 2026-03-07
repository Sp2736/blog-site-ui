import { getPosts } from "@/lib/posts";
import { BlogFeed } from "@/components/blog-feed";

export default function Home() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogFeed posts={posts} />
    </div>
  );
}