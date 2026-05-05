const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  output: "export" as const,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
