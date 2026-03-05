import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // fetch using the clean URL slug
  const post = await db.post.findUnique({
    where: {
      url: slug,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-12">

      <div className="relative w-full max-w-5xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-60 transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-medium tracking-tight">Back to Home</span>
          </Link>
        </div>

        {/* Blog Content */}
        <div className="p-8 md:p-16 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <header className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] opacity-50 mb-4">
              {post.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">{post.title}</h1>
          </header>

          <article className="prose prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-xl md:text-2xl leading-relaxed opacity-80 mb-6 font-light">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}