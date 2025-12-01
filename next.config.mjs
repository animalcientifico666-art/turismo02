/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: false, // 🔥 Fuerza Next.js a usar Webpack en lugar de Turbopack
   images: {
    domains: [
      "images.unsplash.com", 
      "res.cloudinary.com"
    ],
    
  },
};



export default nextConfig;
