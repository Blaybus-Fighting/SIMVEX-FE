// 분해도 조절 슬라이더
import * as Slider from "@radix-ui/react-slider";

type ResolutionSliderProps = {
  value: number; // 0 ~ 1
  onChange: (value: number) => void;
};

export function ResolutionSlider({ value, onChange }: ResolutionSliderProps) {
  return (
    <div className="flex flex-col items-start pt-[0.625rem] px-[0.625rem] bg-[#14161D] rounded-xl gap-[0.938rem]">
      <p className="text-sm font-semibold text-white">분해도 조절</p>

      <div className="flex items-center gap-3">
        {/* 최소값 */}
        <span className="w-2 text-xs font-normal text-white tabular-nums">
          {value}
        </span>

        <Slider.Root
          className="relative flex h-6 items-center"
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={100}
          step={1}
        >
          <Slider.Track className="relative w-[11.25rem] h-1.5 rounded-full bg-[#2B3041]">
            <Slider.Range className="absolute h-full rounded-full bg-[#5BC0FF]" />
          </Slider.Track>
          <Slider.Thumb className="block w-2 h-4 rounded-full bg-[#5BC0FF] shadow-lg focus:outline-none" />
        </Slider.Root>

        {/* 최대값 */}
        <span className="text-xs text-white">100</span>
      </div>
    </div>
  );
}
