import * as THREE from "three";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { MachineVice } from "./models/MachineVice";
import { RobotGripper } from "./models/RobotGripper";
import { Suspension } from "./models/Suspension";
import { V4Engine } from "./models/v4engine/V4Engine";

import { useDetailModelStore } from "@/store/modelStore";
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
  "V4-Engine": V4Engine,
};

/**
 * viewData를 실제 camera/controls에 반영하는 내부 컴포넌트
 * ✅ 요구사항:
 * - 카메라 갱신(복원)은 계속 필요
 * - explode 슬라이더를 움직이는 동안에는 복원 금지
 * - explode가 "멈춘 뒤"에만(일정 시간 변화 없음) 최신 viewData를 적용
 */
function ApplyViewData({
  viewData,
  controlsRef,
  cameraRef,
  isExplodeChanging,
}: {
  viewData?: ViewData;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  isExplodeChanging: boolean;
}) {
  const pendingRef = useRef<ViewData | null>(null);

  // 마지막으로 적용한 viewData를 식별(중복 적용 방지)
  // meta.savedAt이 있으면 그걸 쓰고, 없으면 camera 값으로 대체
  const lastAppliedKeyRef = useRef<string | null>(null);

  const apply = useCallback(
    (vd: ViewData) => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      // camera 복원
      camera.position.set(
        vd.camera.position.x,
        vd.camera.position.y,
        vd.camera.position.z,
      );
      camera.up.set(vd.camera.up.x, vd.camera.up.y, vd.camera.up.z);

      // fov/zoom 적용
      camera.fov = vd.camera.fov;
      camera.zoom = vd.viewport.zoom ?? 1;
      camera.updateProjectionMatrix();

      // OrbitControls target 복원
      controls.target.set(
        vd.camera.target.x,
        vd.camera.target.y,
        vd.camera.target.z,
      );

      // pan 최소 복원 (world offset 가정)
      const panX = vd.viewport.pan?.x ?? 0;
      const panY = vd.viewport.pan?.y ?? 0;
      if (panX !== 0 || panY !== 0) {
        const pan = new THREE.Vector3(panX, panY, 0);
        camera.position.add(pan);
        controls.target.add(pan);
      }

      controls.update();
    },
    [cameraRef, controlsRef],
  );

  // viewData가 들어오면:
  // - explode 조작 중이면 보류
  // - 아니면 즉시 적용
  useEffect(() => {
    if (!viewData) return;

    const key =
      viewData.meta?.savedAt ??
      JSON.stringify({
        p: viewData.camera.position,
        t: viewData.camera.target,
        u: viewData.camera.up,
        f: viewData.camera.fov,
        z: viewData.viewport.zoom,
      });

    // 같은 viewData를 반복 적용하지 않음
    if (key === lastAppliedKeyRef.current) return;

    // 현재 분해 중이면
    if (isExplodeChanging) {
      pendingRef.current = viewData; // 카메라를 복원하지 않고 최신 viewData의 카메라로 분해 진행
      return;
    }

    apply(viewData); // 분해가 멈추면 최신 카메라 위치로 복원
    lastAppliedKeyRef.current = key;
    pendingRef.current = null;
  }, [viewData, isExplodeChanging, apply]);

  // explode 조작이 끝난 순간(isExplodeChanging: true -> false)에
  // 보류된 viewData가 있으면 그때 1회 적용
  useEffect(() => {
    if (isExplodeChanging) return;
    const pending = pendingRef.current;
    if (!pending) return;

    const key =
      pending.meta?.savedAt ??
      JSON.stringify({
        p: pending.camera.position,
        t: pending.camera.target,
        u: pending.camera.up,
        f: pending.camera.fov,
        z: pending.viewport.zoom,
      });

    if (key === lastAppliedKeyRef.current) {
      pendingRef.current = null;
      return;
    }

    apply(pending); // 멈춘 뒤에만 적용
    lastAppliedKeyRef.current = key;
    pendingRef.current = null; // 적용됐으니 pendingRef값을 비움
  }, [isExplodeChanging, apply]);

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

  // explode 조작 중 여부 (슬라이더 움직이는 동안 true)
  const [isExplodeChanging, setIsExplodeChanging] = useState(false);
  const explodeIdleTimerRef = useRef<number | null>(null);

  // explode가 일정 시간 변하지 않으면 멈춘 걸로 판단
  useEffect(() => {
    setIsExplodeChanging(true);

    if (explodeIdleTimerRef.current) {
      window.clearTimeout(explodeIdleTimerRef.current);
    }

    explodeIdleTimerRef.current = window.setTimeout(() => {
      setIsExplodeChanging(false);
    }, 250); // 필요하면 150~400ms 사이로 조절

    return () => {
      if (explodeIdleTimerRef.current)
        window.clearTimeout(explodeIdleTimerRef.current);
    };
  }, [explode]);

  // 디바운스 저장용
  const saveTimerRef = useRef<number | null>(null);
  const latestViewDataRef = useRef<ViewData | null>(null);
  const dirtyRef = useRef(false);

  useEffect(() => {
    if (url) useGLTF.preload(url);
  }, [url]);

  // 실제 저장 함수
  const flushSave = useCallback(() => {
    const payload = latestViewDataRef.current;
    if (!payload) return;
    if (!dirtyRef.current) return;

    dirtyRef.current = false;

    void putSession(modelId, sessionId, payload)
      .then((res) => {
        console.log("세션 업데이트 성공: ", res.data);
      })
      .catch((e) => {
        console.error("putSession 실패:", e);
        dirtyRef.current = true;
      });
  }, [modelId, sessionId]);

  // 변화가 생길 때마다: 스냅샷 갱신 + 3초 후 저장 예약
  const markDirtyAndScheduleSave = useCallback(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    latestViewDataRef.current = buildViewData({ camera, controls, explode });
    dirtyRef.current = true;

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
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
      flushSave();
    };
  }, [flushSave]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [2.2, 1.2, 1.2], fov: 45, near: 0.1, far: 100 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera as THREE.PerspectiveCamera;
      }}
    >
      {/* viewData -> camera/controls 적용 (explode 조작 중에는 적용 금지) */}
      <ApplyViewData
        viewData={viewData}
        controlsRef={controlsRef}
        cameraRef={cameraRef}
        isExplodeChanging={isExplodeChanging}
      />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        {SelectedModel && <SelectedModel explode={explode} />}
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enableDamping
        makeDefault
        minDistance={1.6}
        maxDistance={3.2}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI - 0.2}
        onChange={markDirtyAndScheduleSave}
        onEnd={markDirtyAndScheduleSave}
      />
    </Canvas>
  );
}
