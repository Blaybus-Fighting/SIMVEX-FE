import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
// import { Suspension } from "./models/Suspension";
import { MachineVice } from "./models/MachineVice";
import { useDetailModelStore } from "@/store/modelStore";
import { RobotGripper } from "./models/RobotGripper";
import { Suspension } from "./models/Suspension";
// import { RobotGlipper } from "./models/RobotGlippers";
// import { RobotGlipper } from "./models/RobotGlippers";

type Props = {
  explode: number; // 0~1
  url: string;
};

// ComponentType에 props 지정(모델.tsx props로 만들기 때문에 동일하게 지정)
type ModelProps = {
  explode?: number;
};

type ModelComponent = React.ComponentType<ModelProps>;

const MODEL_COMPONENT_MAP: Record<string, ModelComponent> = {
  "Robot-Gripper": RobotGripper,
  Suspension: Suspension,
  "Machine-Vice": MachineVice,
  // "V4-Engine": V4Engine
};

export default function ExplodeViewer({ explode, url }: Props) {
  const { model } = useDetailModelStore();

  const SelectedModel = model?.name ? MODEL_COMPONENT_MAP[model.name] : null;

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

        {SelectedModel && <SelectedModel explode={explode} />}
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
