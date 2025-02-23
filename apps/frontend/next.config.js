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
};

module.exports = nextConfig;
