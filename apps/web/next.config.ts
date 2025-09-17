import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
 async redirects() {
    return [
      {
        source: '/', // Si la petición es para la ruta raíz
        destination: '/login', // Redirígela a /login
        permanent: true, // Es una redirección permanente
      },
    ];
  },
};

export default nextConfig;
