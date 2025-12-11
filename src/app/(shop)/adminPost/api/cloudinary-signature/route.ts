// app/(shop)/adminPost/api/cloudinary-signature/route.ts
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

  if (!CLOUDINARY_URL)
    return NextResponse.json(
      { error: "CLOUDINARY_URL no definido" },
      { status: 500 }
    );

  // Parsear CLOUDINARY_URL
  const match = CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);

  if (!match)
    return NextResponse.json(
      { error: "CLOUDINARY_URL inválido" },
      { status: 500 }
    );

  const apiKey = match[1];     // 652322699211518
  const apiSecret = match[2];  // KFPKsjMla7PmG_Q2l2Rfzd7C5dA
  const cloudName = match[3];  // duno3hadu

  // timestamp válido
  const timestamp = Math.floor(Date.now() / 1000);

  // 🔥 Firma correcta SOLO con timestamp
  const stringToSign = `timestamp=${timestamp}${apiSecret}`;

  const signature = crypto
    .createHash("sha1")
    .update(stringToSign)
    .digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
  });
}
