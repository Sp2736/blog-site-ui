// src/lib/placeholder-images.ts

// A sleek, futuristic glassmorphism/abstract fallback image
export const DEFAULT_COVER_IMAGE =
  "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1080&auto=format&fit=crop";

export function getPostImage(dbImage: string | null | undefined) {
  // If the database has an image, use it. Otherwise, use the fallback!
  return dbImage ? dbImage : DEFAULT_COVER_IMAGE;
}
