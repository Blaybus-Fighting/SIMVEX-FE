/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",

        // gray: 주로 텍스트나 구분 선에 사용
        gray: {
          100: "#F7F8F9",
          200: "#C3C8CF",
          300: "#989FA5",
          400: "#586167",
        },
        primary: {
          100: "#819EFF",
          200: "#2E53CE",
        },
        color: {
          100: "#2B3041",
          200: "#292B33",
          300: "#191B22",
          400: "#14161D",
        },
        accent: {
          100: "#DB3847",
        },
      },
      fontSize: {
        "title-1": ["56px", { lineHeight: "140%", letterSpacing: "0px" }], // 대제목
        "title-2": ["32px", { lineHeight: "140%", letterSpacing: "0px" }], // 현재 미사용
        "title-3": ["24px", { lineHeight: "140%", letterSpacing: "0px" }], // 소제목
        subtitle: ["20px", { lineHeight: "140%", letterSpacing: "0px" }], // 페이지_제목
        "text-1": ["18px", { lineHeight: "140%", letterSpacing: "0px" }], // 본문_제목
        "text-2": ["16px", { lineHeight: "140%", letterSpacing: "0px" }], // 주요 버튼명, 컴포넌트 제목, 본문_소제목
        "text-3": ["14px", { lineHeight: "140%", letterSpacing: "0px" }], // 기본 버튼명, 노트명, 탭 버튼명
        "text-4": ["14px", { lineHeight: "140%", letterSpacing: "0px" }], // 본문_내용
        caption: ["13px", { lineHeight: "140%", letterSpacing: "0px" }], // 서브 제목(날짜 표시), 작은 버튼명, 정렬 필터명
      },

      fontFamily: {
        pl: ["Pretendard-Light"],
        pr: ["Pretendard-Regular"],
        pm: ["Pretendard-Medium"],
        ps: ["Pretendard-SemiBold"],
        pb: ["Pretendard-Bold"],
      },
    },
  },
  plugins: [],
};
