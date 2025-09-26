import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // This is to allow pdf-parse to be used on the client-side.
    // In a real app you might want to use a more robust solution or a different library.
    if (!isServer) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "fs": false,
            "path": false,
        };
    }
    // This is to handle the canvas dependency from pdfjs-dist
     config.externals.push('canvas');

    return config;
  },
};

export default nextConfig;
