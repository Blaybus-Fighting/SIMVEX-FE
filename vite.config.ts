import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr"; // SVG 아이콘

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr()], // ?react를 붙이면 svg를 리액트 컴포넌트처럼 활용 가능

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@store": path.resolve(__dirname, "./src/store"),
      },
      // Vite가 동일 라이브러리를 여러 인스턴스로 번들링하는 걸 방지하기 위한 설정
      // R3F(Canvas ↔ useThree/Environment) React Context 분리로 발생하는 훅 에러를 막기 위함
      dedupe: [
        "react", // React Context 중복 방지
        "react-dom", // ReactDOM 인스턴스 중복 방지
        "three", // Three.js 객체/Scene 중복 방지
        "@react-three/fiber", // Canvas / useThree 컨텍스트 단일화 (핵심)
        "@react-three/drei", // fiber를 내부에서 쓰므로 함께 dedupe
      ],
    },
    // 3. 서버 프록시 설정 추가 (CORS 해결 핵심)
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        "/oauth2": env.LOGIN_API_URL,
      },
      // host: true, // 0.0.0.0로 열기 (네트워크 접속 허용)
      // strictPort: true,
      // hmr: {
      //   protocol: "ws",
      //   host: "localhost",
      //   port: 5173,
      // },
    },
  };
});
