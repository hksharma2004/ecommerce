/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },

  compiler: {
    styledJsx: true,
  },

  poweredByHeader: false,

  eslint: {
    ignoreDuringBuilds: false,
  },

  // Updated for Next.js 15 - moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['styled-jsx'],

  experimental: {
    esmExternals: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    return config;
  },
};

export default nextConfig;
