import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // 서비스 워커 자동 업데이트 (새 버전 감지 시)
      injectRegister: "auto", // 서비스 워커 등록 스크립트 자동 주입
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}"], // 캐싱할 파일 패턴
        // 캐시 전략 추가 (필요에 따라 설정)
        // 예를 들어, 이미지나 API 응답에 대한 캐싱 전략을 지정할 수 있습니다.
        // runtimeCaching: [
        //   {
        //     urlPattern: ({ url }) => url.origin === 'https://api.example.com', // API 예시
        //     handler: 'NetworkFirst',
        //     options: {
        //       cacheName: 'api-cache',
        //       expiration: {
        //         maxEntries: 10,
        //         maxAgeSeconds: 60 * 60 * 24 * 7, // 1주일
        //       },
        //     },
        //   },
        // ],
      },
      manifest: {
        name: "MyDailyApp", // 앱 이름
        short_name: "DailyApp", // 앱의 짧은 이름
        description: "날씨, 뉴스, 카페 주문을 한 번에! 나만의 커스텀 데일리 앱", // 앱 설명
        theme_color: "#ffffff", // 앱 UI의 기본 색상
        background_color: "#ffffff", // 앱 스플래시 화면 배경색
        display: "standalone", // PWA 디스플레이 모드 (standalone, fullscreen, minimal-ui, browser)
        icons: [
          {
            src: "/icons/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        // 시작 URL (PWA가 처음 실행될 때 열리는 페이지)
        start_url: "/",
        // 범위 (PWA가 제어하는 URL 범위)
        scope: "/",
      },
      devOptions: {
        // 개발 환경에서 서비스 워커가 즉시 등록되도록 설정
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { open: true },
});
