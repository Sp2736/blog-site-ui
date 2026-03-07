import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPosts } from "@/lib/posts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const url = `https://wander-n-wonder.vercel.app/posts/${post.slug}`;

  return {
    title: post.title,
    description: `Read "${post.title}" on Wander-n-Wonder`,
    openGraph: {
      title: post.title,
      description: `Read "${post.title}" on Wander-n-Wonder`,
      url,
      siteName: "Wander-n-Wonder",
      images: [
        {
          url: `/posts/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `Read "${post.title}" on Wander-n-Wonder`,
      images: ["/og/default.png"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-12">
      <div className="relative w-full max-w-5xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-60 transition-all group"
          >
            <ArrowLeft
              className="group-hover:-translate-x-1 transition-transform"
              size={20}
            />
            <span className="font-medium tracking-tight">Back to Home</span>
          </Link>
        </div>

        <div className="p-8 md:p-16 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <header className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] opacity-50 mb-4">
              {post.date} • {post.readingTime}
            </p>
            <h1 className="text-5xl md:text-7xl font-serif leading-tight">
              {post.title}
            </h1>
          </header>
          {/* TOC*/}
          {post.headings.length > 0 && (
            <div className="mb-10 p-6 rounded-xl border border-border/40 bg-card/20">
              <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>

              <ul className="space-y-2 text-sm opacity-80">
                {post.headings.map((heading, i) => {
                  const id = heading.text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");

                  return (
                    <li
                      key={i}
                      style={{
                        marginLeft: heading.level === 3 ? "20px" : "0px",
                      }}
                    >
                      • {heading.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <article
            className="prose dark:prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-slate-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </main>
  );
}
