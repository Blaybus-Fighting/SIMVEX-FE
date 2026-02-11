import * as THREE from "three";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { MachineVice } from "./models/MachineVice";
import { useDetailModelStore } from "@/store/modelStore";
import { RobotGripper } from "./models/RobotGripper";
import { Suspension } from "./models/Suspension";
import type { ViewData } from "@/types/session";
import { putSession } from "@/api/sessionApi";

type Props = {
  explode: number;
  url: string;
  viewData?: ViewData;
  modelId: number;
  sessionId: number;
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

// viewData를 실제 camera/controls에 반영하는 내부 컴포넌트
function ApplyViewData({
  viewData,
  controlsRef,
  cameraRef,
}: {
  viewData?: ViewData;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
}) {
  useEffect(() => {
    if (!viewData) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // camera 복원
    camera.position.set(
      viewData.camera.position.x,
      viewData.camera.position.y,
      viewData.camera.position.z,
    );
    camera.up.set(
      viewData.camera.up.x,
      viewData.camera.up.y,
      viewData.camera.up.z,
    );

    // fov/zoom 적용
    // (PerspectiveCamera 기준: fov + zoom 둘 다 존재. zoom 사용 시 updateProjectionMatrix 필요)
    camera.fov = viewData.camera.fov;
    camera.zoom = viewData.viewport.zoom ?? 1;
    camera.updateProjectionMatrix();

    // OrbitControls target 복원
    controls.target.set(
      viewData.camera.target.x,
      viewData.camera.target.y,
      viewData.camera.target.z,
    );

    // pan/rotation은 프로젝트마다 정의가 달라 OrbitControls에 1:1 매핑이 애매함
    // 일단 pan을 world offset으로 해석해서 target과 camera를 같이 이동시키는 방식으로 최소 복원
    const panX = viewData.viewport.pan?.x ?? 0;
    const panY = viewData.viewport.pan?.y ?? 0;
    if (panX !== 0 || panY !== 0) {
      const pan = new THREE.Vector3(panX, panY, 0);
      camera.position.add(pan); // camera.position.x += ... 대신
      controls.target.add(pan);
    }

    controls.update();
  }, [viewData, controlsRef, cameraRef]);

  return null;
}

// 현재 카메라/컨트롤 상태 -> ViewData로 스냅샷 만드는 함수
function buildViewData(params: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControlsImpl;
  explode: number;
}): ViewData {
  const { camera, controls, explode } = params;

  return {
    camera: {
      position: {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      },
      target: {
        x: controls.target.x,
        y: controls.target.y,
        z: controls.target.z,
      },
      up: { x: camera.up.x, y: camera.up.y, z: camera.up.z },
      fov: camera.fov,
    },
    viewport: {
      zoom: camera.zoom ?? 1,
      // pan/rotation은 OrbitControls에서 “정확한 의미”가 프로젝트마다 달라서
      //    지금은 최소 정보만 유지 (필요하면 여기 확장)
      pan: { x: 0, y: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    explode,
    selection: {
      selectedObjectIds: [],
    },
    meta: {
      savedAt: new Date().toISOString(),
      clientVersion: "web-1.3.2",
    },
  };
}

export default function ExplodeViewer({
  explode,
  url,
  viewData,
  modelId,
  sessionId,
}: Props) {
  const { model } = useDetailModelStore();

  const SelectedModel = model?.name ? MODEL_COMPONENT_MAP[model.name] : null;

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // 디바운스 저장용
  const saveTimerRef = useRef<number | null>(null);
  const latestViewDataRef = useRef<ViewData | null>(null);
  const dirtyRef = useRef(false); // 저장 필요 여부

  useEffect(() => {
    if (url) useGLTF.preload(url);
  }, [url]);

  // 실제 저장 함수
  const flushSave = useCallback(() => {
    const payload = latestViewDataRef.current;
    if (!payload) return;
    if (!dirtyRef.current) return;

    dirtyRef.current = false;

    // cleanup에서도 호출될 수 있어서 fire-and-forget
    void putSession(modelId, sessionId, payload)
      .then((res) => {
        console.log("세션 업데이트 성공: ", res.data);
      })
      .catch((e) => {
        console.error("putSession 실패:", e);
        // 실패하면 다시 dirty로 돌려 재시도 가능하게
        dirtyRef.current = true;
      });
  }, [modelId, sessionId]);

  // 변화가 생길 때마다: 스냅샷 갱신 + 3초 후 저장 예약
  const markDirtyAndScheduleSave = useCallback(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    // 최신 상태 스냅샷 갱신
    latestViewDataRef.current = buildViewData({ camera, controls, explode });
    dirtyRef.current = true;

    // 3초 디바운스
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      flushSave();
    }, 3000);
  }, [explode, flushSave]);

  // explode 값이 바뀔 때도 변화로 간주(슬라이더 조절)
  useEffect(() => {
    markDirtyAndScheduleSave();
  }, [explode, markDirtyAndScheduleSave]);

  // 페이지 이동/언마운트 시: 타이머 정리 + 마지막 값 즉시 저장
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
      flushSave(); // 마지막 값 저장
    };
  }, [flushSave]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]} // 레티나 대응
      camera={{ position: [2.2, 1.2, 1.2], fov: 45, near: 0.1, far: 100 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera as THREE.PerspectiveCamera; // cameraRef 연결
      }}
    >
      {/* viewData를 camera와 controls에 주입 */}
      <ApplyViewData
        viewData={viewData}
        controlsRef={controlsRef}
        cameraRef={cameraRef}
      />

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
        ref={controlsRef} // controlsRef 연결
        enableDamping
        makeDefault
        minDistance={1.6}
        maxDistance={3.2}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI - 0.2}
        onChange={markDirtyAndScheduleSave}
        onEnd={flushSave}
      />
    </Canvas>
  );
}

// 미리 로드(선택)
// useGLTF.preload(url);

/**
 * [ 가져온 viewData를 어디에 적용시켰나 ]
 * • viewData.explode → explode state → <SelectedModel explode={explode} /> 적용
	 •	viewData.camera.position / up / fov / viewport.zoom → camera에 적용
	 •	viewData.camera.target → OrbitControls.target에 적용
	 •	viewport.pan은 “최소 복원”으로 target+camera에 오프셋 적용
   (정확한 pan 의미가 스크린 좌표인지 월드 좌표인지에 따라 더 정교하게 바꿀 수 있음
 */
