import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/lib/posts"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: "black",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Wander-n-Wonder
        </div>
      ),
      size
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "white",
          width: "100%",
          height: "100%",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7 }}>
          wander-n-wonder
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          {post.title}
        </div>

        <div style={{ fontSize: 28, opacity: 0.8 }}>
          swayam patel · tech blog
        </div>
      </div>
    ),
    size
  )
}