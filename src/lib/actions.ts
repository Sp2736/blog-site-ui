"use server";

export async function incrementLike(postId: string) {
  // Mock function since the database/backend was removed.
  console.log(`Liked post: ${postId}`);
  return { success: true };
}
