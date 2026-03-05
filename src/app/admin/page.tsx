// src/app/admin/page.tsx
export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/posts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, TrendingUp, Users, Heart } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function AdminDashboard() {
  const posts = await getPosts();
  
  // Calculate stats from the posts array
  const totalLikes = posts.reduce((acc, post) => acc + (post.likes || 0), 0);
  const totalPosts = posts.length;
  const topCategory = posts.length > 0 
    ? posts.reduce((a, b) => 
        posts.filter(v => v.category === a.category).length >= 
        posts.filter(v => v.category === b.category).length ? a : b
      ).category 
    : "None";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen text-slate-900">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold">Creator Studio</h1>
          <p className="text-slate-500">Analytics & Content Management</p>
        </div>
        {/* Link to the New Post page */}
        <Link href="/admin/new">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Plus size={18} /> New Masterpiece
          </button>
        </Link>
      </header>

      {/* Influencer-like Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Likes" value={totalLikes} icon={<Heart className="text-red-500" />} />
        <StatCard title="Total Posts" value={totalPosts} icon={<Plus className="text-indigo-500" />} />
        <StatCard title="Famous Category" value={topCategory} icon={<TrendingUp className="text-green-500" />} />
        <StatCard title="Studio Status" value="Live" icon={<Users className="text-blue-500" />} />
      </div>

      {/* Post List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold">Post Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Performance</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4">
                  <span className="capitalize px-2 py-1 rounded bg-slate-100 text-xs">{post.category}</span>
                </td>
                <td className="p-4 text-sm text-slate-500">{post.likes} Likes</td>
                <td className="p-4 text-right">
                  <DeleteButton id={post.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold capitalize">{value}</div>
      </CardContent>
    </Card>
  );
}