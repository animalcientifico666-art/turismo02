// app/(shop)/adminPost/api/cloudinary-signature/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
  if (!CLOUDINARY_URL) return NextResponse.json({ error: "CLOUDINARY_URL no definido" }, { status: 500 });

  // Parsear la URL
  const match = CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (!match) return NextResponse.json({ error: "CLOUDINARY_URL inválido" }, { status: 500 });

  const apiKey = match[1];
  const apiSecret = match[2];
  const cloudName = match[3];

  // Timestamp
  const timestamp = Math.floor(Date.now() / 1000);

  // Crear signature
  const signatureString = `timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

  return NextResponse.json({ cloudName, apiKey, timestamp, signature });
}
