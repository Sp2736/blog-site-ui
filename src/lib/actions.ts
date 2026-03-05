"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id: string) {
  await db.post.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  // Generate the 'url' from the title
  const generatedUrl = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Save EVERYTHING to the database
  await db.post.create({
    data: {
      title,
      content,
      category,
      image: image || null, // Saves the image if provided, otherwise null
      url: generatedUrl,
      likes: 0,
    },
  });

  // Refresh the pages and redirect
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function incrementLike(id: string) {
  await db.post.update({
    where: { id },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  // Refresh the homepage and admin dashboard so the new count shows up
  revalidatePath("/");
  revalidatePath("/admin");
}
