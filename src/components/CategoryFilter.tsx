"use client";

import { Filter, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Tech & Code",
  "Algorithm Alley",
  "Brain Dumps",
  "Yapping",
  "University Diaries",
  "Meme Stash",
  "Open Source & Setups",
  "Fun Facts & TIL",
  "Hot Takes",
  "Need To Say It",
];

export function CategoryFilter({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  return (
    <div className="w-full mb-10 z-20 relative">
      {/* DESKTOP VIEW: The row of frosted buttons (Hidden on mobile) */}
      <div className="hidden md:flex flex-wrap gap-2 items-center">
        <Filter size={18} className="text-muted-foreground mr-2" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                : "bg-card/40 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 backdrop-blur-xl hover:bg-card/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MOBILE VIEW: The sleek, glassmorphic dropdown (Hidden on desktop) */}
      <div className="md:hidden relative flex items-center w-full">
        {/* Left Icon */}
        <Filter
          size={18}
          className="absolute left-4 text-primary pointer-events-none"
        />

        {/* The Native Select */}
        <select
          value={activeCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="w-full appearance-none bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl py-3.5 pl-12 pr-10 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg transition-all cursor-pointer"
        >
          {CATEGORIES.map((cat) => (
            <option
              key={cat}
              value={cat}
              className="bg-background text-foreground py-2"
            >
              {cat}
            </option>
          ))}
        </select>

        {/* Custom Right Arrow (Overrides the ugly default browser arrow) */}
        <ChevronDown
          size={18}
          className="absolute right-4 text-muted-foreground pointer-events-none"
        />
      </div>
    </div>
  );
}
