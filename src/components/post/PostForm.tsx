"use client";

import { useState } from "react";

export default function PostForm() {
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    if (image) formData.append("image", image);

    await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    window.location.href = "/blog";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="title"
        type="text"
        placeholder="Título"
        required
        className="border p-2 w-full"
      />

      <textarea
        name="content"
        placeholder="Contenido"
        required
        className="border p-2 w-full"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear Post
      </button>
    </form>
  );
}
