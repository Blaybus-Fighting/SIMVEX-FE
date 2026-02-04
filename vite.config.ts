import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr"; // SVG 아이콘

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // ?react를 붙이면 svg를 리액트 컴포넌트처럼 활용 가능
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
