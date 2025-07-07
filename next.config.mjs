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
    
    // Fix styled-jsx compilation issues
    compiler: {
        styledJsx: true,
    },
    
    // Add experimental features for better compatibility
    experimental: {
        esmExternals: true,
        serverComponentsExternalPackages: ['styled-jsx'],
    },
    
    // Configure webpack for better module resolution
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add fallbacks for missing modules
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
