import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimisations pour réduire la taille du CSS et améliorer les performances
  compress: true,
  poweredByHeader: false,
  
  // Optimisation des images (déjà activée par défaut dans Next.js)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  
  // Configuration SWC pour éviter les polyfills inutiles
  // Cibler uniquement les navigateurs modernes qui supportent ES6+ nativement
  // Note: swcMinify n'existe plus dans Next.js 16, SWC est utilisé par défaut
  // Les fonctionnalités Baseline (Array.at, Object.fromEntries, etc.) sont supportées nativement
  // Pas besoin de polyfills pour les navigateurs modernes
  // Next.js utilisera automatiquement .browserslistrc pour déterminer les cibles de transpilation
  experimental: {
    // Optimiser pour les navigateurs modernes uniquement
    // Tree-shaking agressif pour réduire la taille du bundle
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      '@clerk/nextjs',
      '@supabase/supabase-js',
    ],
  },
  
  // Optimisation du bundle et de la transpilation
  // Réduire la taille des chunks JavaScript et éviter les polyfills inutiles
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimiser pour les navigateurs modernes
      // Next.js utilisera .browserslistrc pour déterminer les polyfills nécessaires
      // Avec notre configuration, les fonctionnalités Baseline ne nécessiteront pas de polyfills
      
      // Optimiser les chunks pour réduire la taille du bundle
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunks séparés pour meilleur cache et tree-shaking
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            reactIcons: {
              name: 'react-icons',
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  
  // Headers pour améliorer le cache
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/css/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
