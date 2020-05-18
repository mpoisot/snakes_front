module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8008",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
