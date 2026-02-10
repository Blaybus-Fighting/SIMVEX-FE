import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { Suspension } from "./models/Suspension";
import { MachineVice } from "./models/MachineVice";
// import { RobotGlipper } from "./models/RobotGlippers";
// import { RobotGlipper } from "./models/RobotGlippers";

type Props = {
  explode: number; // 0~1
  url: string;
  selectedPart: string | null;
};

export default function ExplodeViewer({ explode, url, selectedPart }: Props) {
  useEffect(() => {
    if (url) useGLTF.preload(url);
  }, [url]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]} // 레티나 대응
      camera={{ position: [2.2, 1.2, 1.2], fov: 45, near: 0.1, far: 100 }}
      // style={{ width: "100%", height: "100%", background }}
    >
      {/* 기본 조명 */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 바닥(그림자 받기용) - 필요 없으면 삭제 */}
      {/* <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.9, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.25} />
      </mesh> */}

      <Suspense fallback={null}>
        {/* HDRI 환경광(선택). 없어도 됨 */}
        <Environment preset="warehouse" />

        {/* <RobotGlipper explode={explode} selectedPart={selectedPart} /> */}
        {/* <Suspension explode={explode} selectedPart={selectedPart} /> */}
        <MachineVice explode={explode} selectedPart={selectedPart} />
      </Suspense>

      {/* 마우스 회전/줌 */}
      <OrbitControls
        enableDamping
        makeDefault
        minDistance={1.6}
        maxDistance={3.2}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI - 0.2}
      />
    </Canvas>
  );
}

// 미리 로드(선택)
// useGLTF.preload(url);
