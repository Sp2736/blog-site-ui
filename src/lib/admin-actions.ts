// src/lib/admin-actions.ts
import { db } from "@/lib/db";

export async function getInfluencerStats() {
  const totalLikes = await db.post.aggregate({ _sum: { likes: true } });
  const totalPosts = await db.post.count();

  // Daily Readers (last 24h)
  const dailyReaders = await db.view.count({
    where: { timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });

  // Most Famous Category
  const categoryStats = await db.post.groupBy({
    by: ["category"],
    _sum: { likes: true },
    orderBy: { _sum: { likes: true } as any, _count: "desc" },
  });

  return {
    totalLikes: totalLikes._sum.likes || 0,
    dailyReaders,
    totalPosts,
    topCategory: categoryStats[0]?.category || "None",
  };
}
