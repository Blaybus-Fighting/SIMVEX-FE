// <reference types="vite/client" />

// TypeScript에 *.svg?react 타입 선언 추가
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

// 일반 CSS side-effect import 허용
declare module "*.css";

// Swiper CSS 엔트리들 side-effect import 허용
declare module "swiper/css";
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";
declare module "swiper/css/autoplay";
declare module "swiper/css/effect-fade";
declare module "swiper/css/effect-coverflow";
