import crypto from "crypto";

export async function uploadImageToCloudinary(file: File, publicId?: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("❌ Faltan variables CLOUDINARY en tu .env");
  }

  const timestamp = Math.floor(Date.now() / 1000);

  // Crear los parámetros para la firma en un objeto
  const params: Record<string, string> = { timestamp: timestamp.toString() };
  if (publicId) {
    params.public_id = publicId;
  }

  // Ordenar los parámetros alfabéticamente y unirlos en un string
  const signatureString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&") + apiSecret;

  const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

  // Enviar a Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  if (publicId) {
    formData.append("public_id", publicId);
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const txt = await res.text();
    throw new Error("❌ Error al subir a Cloudinary: " + txt);
  }

  return await res.json();
}
