import { useEffect, useRef, useState } from "react";

type Props = {
  loading: boolean;
};

export default function ApiLoadingBar({ loading }: Props) {
  const [visible, _setVisible] = useState(false); // 로딩 UI를 화면에 렌더링할지
  const [progress, setProgress] = useState(0); // 진행률

  // 렌더링 안을 일으키는 내부 상태
  const visibleRef = useRef(false); // visible 최신 값 저장용
  const intervalRef = useRef<number | null>(null); // 진행률을 올리는 setInterval 값 저장용
  const hideTimerRef = useRef<number | null>(null); // 로딩 끝난 뒤 사라지기 전 딜레이 타이머
  const rafRef = useRef<number | null>(null); // requestAnimationFrame ID 저장용

  const setVisible = (v: boolean) => {
    visibleRef.current = v;
    _setVisible(v);
  };

  const clearAllTimers = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = null;

    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  useEffect(() => {
    // effect cleanup
    return () => clearAllTimers();
  }, []);

  // loading 변화 감지
  useEffect(() => {
    // 이전 타이머 정리
    clearAllTimers();

    // state 변경을 동기로 하지 않기 위해 rAF로 한 번 미룸
    rafRef.current = requestAnimationFrame(() => {
      // 로딩 시작
      if (loading) {
        setVisible(true);
        setProgress((p) => (p > 0 ? p : 10)); // 시작하자마자 살짝 보이게

        intervalRef.current = window.setInterval(() => {
          // 진행 계산 로직
          setProgress((p) => {
            if (p >= 90) return p;
            const remaining = 90 - p;
            const step = Math.max(0.5, remaining * 0.06);
            return Math.min(90, p + step);
          });
        }, 120);

        return;
      }

      // 로딩 종료(요청 끝)
      if (!loading && visibleRef.current) {
        setProgress(100);

        hideTimerRef.current = window.setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 350);
      }
    });

    // loading 바뀔 때마다 rAF 취소
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [loading]);

  if (!visible) return null;

  const containerClass =
    "fixed flex-col gap-12 inset-0 z-[9999] flex items-center justify-center";

  const barWrapClass =
    "w-[420px] max-w-[80vw] rounded-full bg-gray-400 p-[3px]";

  const barClass =
    "h-[6px] rounded-full bg-primary-200 transition-[width] duration-200 ease-out";

  return (
    <div className={containerClass}>
      <p className="text-gray-100 text-subtitle font-semibold">
        학습 자료를 불러오고 있어요...
      </p>
      <div className={barWrapClass}>
        <div className={barClass} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
