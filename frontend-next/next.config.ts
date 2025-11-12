import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["webdiaries.test", "*.webdiaries.test"]
}

export default nextConfig
