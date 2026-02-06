import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr"; // SVG 아이콘

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr()], // ?react를 붙이면 svg를 리액트 컴포넌트처럼 활용 가능

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
      },
    },
    // 3. 서버 프록시 설정 추가 (CORS 해결 핵심)
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 프론트에서 /api/chat -> 백엔드로 /chat 요청 보냄
          secure: false,
        },
      },
    },
  };
});
