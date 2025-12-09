import crypto from "crypto";

export async function uploadImageToCloudinary(file: File) {
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(
      `folder=general&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
    )
    .digest("hex");

  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", "general"); // <= IMPORTANTE

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("❌ Error al subir imagen a Cloudinary:", error);
    throw new Error("Error al subir la imagen");
  }

  return res.json();
}
