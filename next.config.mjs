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

  // Removed transpilePackages to avoid conflict
  // transpilePackages: ['styled-jsx'],

  compiler: {
    styledJsx: true,
  },

  poweredByHeader: false,

  eslint: {
    ignoreDuringBuilds: false,
  },

  experimental: {
    esmExternals: true,
    serverComponentsExternalPackages: ['styled-jsx'], // Keep this only
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'styled-jsx': require.resolve('styled-jsx'),
    };

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

