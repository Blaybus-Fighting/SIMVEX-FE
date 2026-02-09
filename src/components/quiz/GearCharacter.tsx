type Props = {
  size?: number;
};

export default function GearCharacter({ size = 180 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center animate-gear-bounce"
    >
      {/* 톱니바퀴 (그라데이션으로 조악함 제거) */}
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="gearGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9DB8FF" />
            <stop offset="100%" stopColor="#5E82FF" />
          </linearGradient>
        </defs>

        <path
          d="M19.4 13.5v-3l-2-.3a6.8 6.8 0 0 0-.8-1.9l1.2-1.6-2.1-2.1-1.6 1.2a6.8 6.8 0 0 0-1.9-.8l-.3-2h-3l-.3 2a6.8 6.8 0 0 0-1.9.8L6.1 4.6 4 6.7l1.2 1.6a6.8 6.8 0 0 0-.8 1.9l-2 .3v3l2 .3c.2.7.4 1.3.8 1.9L4 17.3l2.1 2.1 1.6-1.2c.6.4 1.2.6 1.9.8l.3 2h3l.3-2c.7-.2 1.3-.4 1.9-.8l1.6 1.2 2.1-2.1-1.2-1.6c.4-.6.6-1.2.8-1.9l2-.3Z"
          fill="url(#gearGrad)"
        />
      </svg>

      {/* 눈  */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-7">
        {/* 왼쪽 눈 */}
        <svg width="18" height="30" viewBox="0 0 14 24">
          <path
            d="
              M7 3.5
              C9.5 4.5, 11.5 7, 11.5 12
              C11.5 17, 9.5 19.5, 7 20.5
              C4.5 19.5, 2.5 17, 2.5 12
              C2.5 7, 4.5 4.5, 7 3.5
              Z
            "
            fill="rgba(255,255,255,0.95)"
          />
        </svg>

        {/* 오른쪽 눈 */}
        <svg width="18" height="30" viewBox="0 0 14 24">
          <path
            d="
              M7 3.5
              C9.5 4.5, 11.5 7, 11.5 12
              C11.5 17, 9.5 19.5, 7 20.5
              C4.5 19.5, 2.5 17, 2.5 12
              C2.5 7, 4.5 4.5, 7 3.5
              Z
            "
            fill="rgba(255,255,255,0.95)"
          />
        </svg>
      </div>
    </div>
  );
}
