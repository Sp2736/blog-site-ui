// src/lib/categories.ts

// The original exports needed by the Blog Feed for filtering
export const categories = [
  "Tech & Code",
  "Algorithm Alley",
  "Brain Dumps",
  "Yapping",
  "University Diaries",
  "Meme Stash",
  "Open Source & Setups",
  "Fun Facts & TIL",
  "Hot Takes",
  "Need to Say It",
] as const;

export type Category = (typeof categories)[number];

// Uniform color palette configurations
export type CategoryColorConfig = {
  bg: string;
  text: string;
  border: string;
  hex: string;
};

export const CATEGORY_COLORS: Record<string, CategoryColorConfig> = {
  "Tech & Code": {
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    border: "border-blue-500/30",
    hex: "#3b82f6",
  },
  "Algorithm Alley": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/30",
    hex: "#10b981",
  },
  "Brain Dumps": {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    border: "border-orange-500/30",
    hex: "#f97316",
  },
  Yapping: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    border: "border-orange-500/30",
    hex: "#f97316",
  },
  "University Diaries": {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/30",
    hex: "#a855f7",
  },
  "Meme Stash": {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    border: "border-yellow-500/30",
    hex: "#eab308",
  },
  "Open Source & Setups": {
    bg: "bg-cyan-500/10",
    text: "text-cyan-500",
    border: "border-cyan-500/30",
    hex: "#06b6d4",
  },
  "Fun Facts & TIL": {
    bg: "bg-pink-500/10",
    text: "text-pink-500",
    border: "border-pink-500/30",
    hex: "#ec4899",
  },
  "Hot Takes": {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/30",
    hex: "#ef4444",
  },
  "Need to Say It": {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/30",
    hex: "#ef4444",
  },
};

// Default fallback color if a category somehow doesn't match
export const DEFAULT_COLOR: CategoryColorConfig = {
  bg: "bg-slate-500/10",
  text: "text-slate-500",
  border: "border-slate-500/30",
  hex: "#64748b",
};
