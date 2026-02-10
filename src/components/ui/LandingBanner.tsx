import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MmmImg from "@/assets/images/banner/mmm.png";
import PppImg from "@/assets/images/banner/ppp.png";
import AaaImg from "@/assets/images/banner/aaa.png";
import QqqImg from "@/assets/images/banner/qqq.png";

type Banner = {
  id: string;
  href: string;
  src?: string;
  alt: string;
};

const BANNERS: Banner[] = [
  {id: "b1", href: "#", src: MmmImg, alt: "Banner 1"},
  {id: "b2", href: "#", src: PppImg, alt: "Banner 2"},
  {id: "b3", href: "#", src: AaaImg, alt: "Banner 3"},
  {id: "b4", href: "#", src: QqqImg, alt: "Banner 4"},
];

export default function LandingBanner() {
  // 슬라이드 복제(현재 2번 반복)
  const slides = [...BANNERS, ...BANNERS];

  return (
    <div>
      {/* 전체 캐러셀 컨테이너 컴포넌트 */}
      <Swiper
        modules={[Autoplay]} // autoplay 기능: 자동 슬라이딩
        loop // 슬라이드 루프 설정(true: 무한 루프)
        slidesPerView="auto" // 한번에 보여지는 슬라이드 수
        spaceBetween={24}
        allowTouchMove // 마우스로 드래그/터치 가능
        speed={10000} // 애니메이션 속도
        autoplay={{
          // 자동재생 설정
          delay: 0, // 끊김없이 계속 이동
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // 마우스 올리면 멈춤(원치 않으면 false)
        }}
        direction="horizontal" // 슬라이드 방향
        className="marqueeSwiper"
      >
        {slides.map((b, idx) => (
          // 개별 슬라이드(카드 1장)
          <SwiperSlide key={`${b.id}-${idx}`} className="!w-[411px] !h-[312px]">
            <a
              href={b.href}
              className="flex h-full w-full flex-col overflow-hidden rounded-xl
               bg-background-400 border border-[#2B3041]"
            >
              <img
                src={b.src}
                alt={b.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
