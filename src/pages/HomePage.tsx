import Rendering3D from "@components/Rendering3D";

export default function Home() {
  return (
    <div>
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
