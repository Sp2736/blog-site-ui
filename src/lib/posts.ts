import { db } from "./db";

export async function getPosts() {
  // Fetches all posts from database
  return await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPost(id: string) {
  // Fetches a single post by its ID from the database
  return await db.post.findUnique({
    where: { id },
  });
}
