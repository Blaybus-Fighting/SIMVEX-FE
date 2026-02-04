// 컴포넌트 구현을 위한 테스트 페이지
import Rendering3D from "@components/Rendering3D";

export default function Test() {
  return (
    <div className="h-full">
      <Rendering3D
        pageKey="pageA"
        onPartClick={(part) => {
          // page 이동
          console.log("pageA 클릭:", part);
        }}
      />
    </div>
  );
}
