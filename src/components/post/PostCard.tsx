"use client";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={300}
            className="rounded-md mb-3"
          />
        )}

        <h2 className="font-bold text-xl">{post.title}</h2>
        <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
      </div>
    </Link>
  );
}
