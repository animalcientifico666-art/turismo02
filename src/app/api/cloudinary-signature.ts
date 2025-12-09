import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
  if (!CLOUDINARY_URL) return res.status(500).json({ error: "CLOUDINARY_URL no definido" });

  // Parsear la URL
  const match = CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (!match) return res.status(500).json({ error: "CLOUDINARY_URL inválido" });

  const apiKey = match[1];
  const apiSecret = match[2];
  const cloudName = match[3];

  // Timestamp
  const timestamp = Math.floor(Date.now() / 1000);

  // Crear signature
  const signatureString = `timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

  res.status(200).json({ cloudName, apiKey, timestamp, signature });
}
