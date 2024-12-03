import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://useraccmgt-amc9dshhg3drawdj.canadacentral-01.azurewebsites.net",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite the API path
      },
      "/jobs": {
        target: "https://jobappms.azurewebsites.net/", // Replace with your second API base URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/jobs/, ""), // Rewrite the second API path
      },
      "/applications": {
        target: "https://jobappms.azurewebsites.net/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/applications/, ""), // Ensure the path is correctly rewritten
      },
    },
  },
});
