// src/app/admin/new/page.tsx
import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowLeft, Image as ImageIcon, FileText, Tag } from "lucide-react";

const CATEGORIES = [
  "Tech & Code",
  "Algorithm Alley",
  "Brain Dumps",
  "Yapping",
  "University Diaries",
  "Meme Stash",
  "Open Source & Setups",
  "Fun Facts & TIL",
  "Hot Takes",
  "Need To Say It"
];

export default function NewPostPage() {
  return (
    // Base layer: Dark slate background, light text for readability
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              New Masterpiece
            </h1>
            <p className="text-slate-400 text-lg">Drafting your next wonder into the digital cosmos.</p>
          </div>
          <Link href="/admin">
            <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Studio
            </Button>
          </Link>
        </header>

        {/* The Form */}
        <form action={createPost} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content Area (Left 2/3rds) */}
          <div className="md:col-span-2 space-y-8 bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-indigo-950/20">
            
            {/* Post Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" /> Post Title
              </label>
              <input 
                id="title"
                name="title" 
                required 
                type="text"
                placeholder="The Emergence of Sentient Syntax..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all outline-none text-lg font-medium"
              />
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="flex items-center gap-2 text-sm font-medium text-indigo-300">
                <FileText className="h-4 w-4" /> The Wonder (Content)
              </label>
              <textarea 
                id="content"
                name="content" 
                required 
                rows={15}
                placeholder="In the neon-drenched silicon valleys of Neo-Kyoto..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all outline-none font-mono text-sm leading-relaxed"
              />
               <p className="text-xs text-slate-500 pt-1">Pro-tip: Markdown formatting is fully supported.</p>
            </div>
          </div>

          {/* Sidebar Area (Right 1/3rd) */}
          <div className="space-y-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                
                {/* Category Selector */}
                <div className="space-y-2">
                  <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                    <Tag className="h-4 w-4" /> Category (Vibe)
                  </label>
                  <select 
                    id="category"
                    name="category" 
                    required
                    // Custom arrow for the dark theme select
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white appearance-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all outline-none cursor-pointer"
                  >
                    <option value="" disabled selected className="text-slate-600">Select a vibe...</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-950 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cover Image URL */}
                <div className="space-y-2">
                  <label htmlFor="image" className="flex items-center gap-2 text-sm font-medium text-cyan-300">
                    <ImageIcon className="h-4 w-4" /> Cover Image URL
                  </label>
                  <input 
                    id="image"
                    name="image" 
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all outline-none text-sm"
                  />
                </div>
            </div>

            {/* Action Buttons Box */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-dashed border-slate-700 space-y-4">
                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-6 text-md rounded-lg shadow-lg shadow-indigo-950/30 transition-all hover:-translate-y-0.5">
                    <Sparkles className="mr-2 h-5 w-5" /> Publish to the Cosmos
                </Button>
                <Link href="/admin" className="block w-full">
                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white py-6">
                        Discard Draft
                    </Button>
                </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}