/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub
      "lh3.googleusercontent.com",     // Google
      "res.cloudinary.com",            // (if you use Cloudinary later)
    ],
  },
};

module.exports = nextConfig;
