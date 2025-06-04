/** @type {import('next').NextConfig}  */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.pexels.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "cdn.hashnode.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "miro.medium.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "i.ytimg.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "ixorasolution.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
module.exports = nextConfig;
