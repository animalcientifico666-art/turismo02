"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import crypto from "crypto";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

/* =======================================================
   SUBIR IMAGEN A CLOUDINARY SIN UPLOAD PRESET
   usando firma (signature) segura generada en el frontend
   ======================================================= */
async function uploadImageToCloudinary(file: File) {
  // Pedimos la firma al backend
  const res = await fetch("/adminPost/api/cloudinary-signature");
  const { cloudName, apiKey, timestamp, signature } = await res.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!uploadRes.ok) {
    const txt = await uploadRes.text();
    throw new Error("Error al subir imagen: " + txt);
  }

  return await uploadRes.json();
}


export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    selectedFiles.forEach((file) => {
      if (file.size > 5_000_000) {
        toast.error(`${file.name} es demasiado grande (máx 5MB)`);
      } else if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} no es una imagen válida`);
      } else {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    });

    setFiles(validFiles);
    setPreviews(validPreviews);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (files.length > 0) {
        const data = await uploadImageToCloudinary(files[0]);
        imageUrl = data.secure_url;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Error al crear el post");

      toast.success("Post creado con éxito!");
      setTitle("");
      setContent("");
      setFiles([]);
      setPreviews([]);
      if (inputFileRef.current) inputFileRef.current.value = "";
    } catch (error: any) {
      toast.error(error.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4">Crear Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Título</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Escribe el título del post"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Contenido</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Escribe el contenido del post..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Imagen (opcional)</label>
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="h-24 w-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Post"}
        </button>
      </form>
    </div>
  );
}
