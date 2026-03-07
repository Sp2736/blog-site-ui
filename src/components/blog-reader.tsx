"use client";

import { Heart, Share2, ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/use-theme-engine";
import { PostInteractions } from "@/components/PostInteractions";

interface ReaderProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function BlogReader({ title, content, onClose }: ReaderProps) {
  const { theme } = useTheme();

  // Dynamic Theme Styling Map
  const themeStyles = {
    light: "bg-black/40 text-[#f3e8d2] border-[#4b3d2b]",
    dark: "bg-[#020617]/70 text-[#fef08a] border-[#ca8a04]",
    cyberpunk: "bg-[#f4ebd8]/80 text-[#3c2f2f] border-[#8b7355]",
    groovy: "bg-white/40 text-[#431407] border-[#ea580c] backdrop-blur-xl",
    cosmic:
      "bg-[#2e1065]/60 text-[#ff00ff] border-[#f43f5e] shadow-[0_0_20px_rgba(244,63,94,0.4)]",
  };

  const currentStyle = themeStyles[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border backdrop-blur-md flex flex-col ${currentStyle}`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-inherit">
          <button
            onClick={onClose}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={24} />
            <span className="font-bold uppercase tracking-widest">Home</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">
          <h1 className="text-4xl md:text-6xl font-serif mb-8">{title}</h1>
          <div className="text-lg md:text-xl leading-relaxed opacity-90 space-y-6">
            {content.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop Blur/Click-away */}
      <div className="absolute inset-0 -z-10 bg-black/20" onClick={onClose} />
    </div>
  );
}
