//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3333/api/:path*',
      },
    ];
  },
  compiler: {
    styledComponents: true,
    /** Prev babel config:
     *  { "ssr": true, "displayName": true, "preprocess": false }
     */
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
