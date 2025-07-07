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

  // Updated for Next.js 15 - moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['styled-jsx'],

  experimental: {
    esmExternals: true,
    // Removed serverComponentsExternalPackages - moved to serverExternalPackages above
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Fix for ES modules - use dynamic import or alternative approach
    config.resolve.alias = {
      ...config.resolve.alias,
      // Remove the require.resolve as it's not available in ES modules
      // styled-jsx should be handled by serverExternalPackages instead
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
