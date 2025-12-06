import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: true,

env: {
DATABASE_URL: process.env.DATABASE_URL,
AUTH_SECRET: process.env.AUTH_SECRET,


CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,


},

images: {
remotePatterns: [
{
protocol: "https",
hostname: "res.cloudinary.com",
pathname: "/**",
},
],
},
};

export default nextConfig;
