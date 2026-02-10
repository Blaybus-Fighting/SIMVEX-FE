import * as THREE from "three";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";
import { usePartStore } from "@/store/partStore";

type GLTFResult = GLTF & {
  nodes: {
    Solid1005: THREE.Mesh;
    Solid1005_1: THREE.Mesh;
    NIT: THREE.Mesh;
    NUT: THREE.Mesh;
    ROD: THREE.Mesh;
    SPRING: THREE.Mesh;
  };
  materials: {
    "AnodizedBlack.001": THREE.MeshStandardMaterial;
    "ChromePolished.001": THREE.MeshStandardMaterial;
    "LightRed.002": THREE.MeshStandardMaterial;
    "LightRed.003": THREE.MeshStandardMaterial;
    "Opal.001": THREE.MeshStandardMaterial;
    "BlueWallPaintGlossy.001": THREE.MeshStandardMaterial;
  };
};

type SuspensionPartKey = "Base" | "NIT" | "NUT" | "ROD" | "SPRING";

type ModelProps = ThreeElements["group"] & {
  explode?: number; // 0~1
};

export function Suspension({
  explode = 0,
  url = "/models/Suspension.glb",
  ...props
}: ModelProps & { url?: string }) {
  const { nodes, materials } = useGLTF(url) as unknown as GLTFResult;
  const { part } = usePartStore(); // 선택한 부품

  /** 선택 안 된 파트들에 적용할 고스트 머티리얼 */
  const ghostMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        metalness: 0,
        roughness: 1,
      }),
    [],
  );

  /** 선택된 파트에 적용할 하이라이트 머티리얼(원본 clone + emissive) */
  const highlighted = useMemo(() => {
    const make = (m: THREE.MeshStandardMaterial) => {
      const c = m.clone();

      // 원래 색을 emissive로 사용 → 색 안 변하고 밝아짐
      c.emissive = c.color.clone();
      c.emissiveIntensity = 1.0; // 원하는 만큼 (0.3~1.2)

      return c;
    };

    return {
      anodized: make(materials["AnodizedBlack.001"]),
      chrome: make(materials["ChromePolished.001"]),
      red2: make(materials["LightRed.002"]),
      red3: make(materials["LightRed.003"]),
      opal: make(materials["Opal.001"]),
      blue: make(materials["BlueWallPaintGlossy.001"]),
    };
  }, [materials]);

  // 정규화(알파벳만 남기고 대문자)
  const normalize = (s: string) => s.replace(/[^a-zA-Z]/g, "").toUpperCase();

  /* 선택 판정: mesh.name(=partKey) 기준 */
  const isSelected = (key: SuspensionPartKey) => {
    if (!part) return true; // 아무것도 선택 안하면 전부 정상 표시

    // 비교를 위해 다 정규화 진행
    const picked = normalize(part.name);
    const target = normalize(key);

    return picked === target; // 동일하면 true 반환
  };

  /* key에 따라 색상을 결정 */
  const mat = (
    key: SuspensionPartKey,
    original: THREE.MeshStandardMaterial,
    highlight: THREE.MeshStandardMaterial,
  ) => {
    if (!part) return original; // 선택 없음 → 원래 재질
    if (isSelected(key)) return highlight; // 선택됨 → 하이라이트
    return ghostMaterial; // 선택 안됨 → 투명
  };

  /* 초기 위치 */
  const base = useMemo(
    () => ({
      solidGroup: new THREE.Vector3(-0.066, -0.19, 0.736),
      nit: new THREE.Vector3(0.017, 0.31, -0.184),
      nut: new THREE.Vector3(0.017, 0.31, -0.184),
      rod: new THREE.Vector3(0.017, 0.31, -0.184),
      spring: new THREE.Vector3(0.017, 0.31, -0.184),
    }),
    [],
  );

  /* 분해하는 방향 */
  const dir = useMemo(
    () => ({
      solidGroup: new THREE.Vector3(1, 0, 0),
      nit: new THREE.Vector3(-1, 0.2, 0),
      nut: new THREE.Vector3(0, 1, 0),
      rod: new THREE.Vector3(0, 0, 1),
      spring: new THREE.Vector3(0.4, -0.2, -1),
    }),
    [],
  );

  /* 분해 거리 */
  const distByPart = useMemo(
    () => ({
      solidGroup: 0.6,
      nit: 0.64,
      nut: 0.62,
      rod: 0.66,
      spring: 0.68,
    }),
    [],
  );

  /* position calc helper */
  const pos = useMemo(() => {
    return (
      baseV: THREE.Vector3,
      dirV: THREE.Vector3,
      t: number,
      dist: number,
    ) => {
      const v = baseV.clone().add(dirV.clone().multiplyScalar(t * dist));
      v.x = THREE.MathUtils.clamp(v.x, -0.6, 0.6);
      v.y = THREE.MathUtils.clamp(v.y, -0.6, 0.6);
      v.z = THREE.MathUtils.clamp(v.z, -0.6, 0.6);
      return [v.x, v.y, v.z] as [number, number, number];
    };
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Base = Solid1005 + Solid1005_1 : 둘 다 name을 "Base"로 */}
      <group
        name="Base"
        position={pos(
          base.solidGroup,
          dir.solidGroup,
          explode,
          distByPart.solidGroup,
        )}
        rotation={[-1.56, -1.403, -0.493]}
        scale={0.1}
      >
        <mesh
          name="Base"
          castShadow
          receiveShadow
          geometry={nodes.Solid1005.geometry}
          material={mat(
            "Base",
            materials["AnodizedBlack.001"],
            highlighted.anodized,
          )}
        />
        <mesh
          name="Base"
          castShadow
          receiveShadow
          geometry={nodes.Solid1005_1.geometry}
          material={mat(
            "Base",
            materials["ChromePolished.001"],
            highlighted.chrome,
          )}
        />
      </group>

      <mesh
        name="NIT"
        castShadow
        receiveShadow
        geometry={nodes.NIT.geometry}
        material={mat("NIT", materials["LightRed.002"], highlighted.red2)}
        position={pos(base.nit, dir.nit, explode, distByPart.nit)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        name="NUT"
        castShadow
        receiveShadow
        geometry={nodes.NUT.geometry}
        material={mat("NUT", materials["LightRed.003"], highlighted.red3)}
        position={pos(base.nut, dir.nut, explode, distByPart.nut)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        name="ROD"
        castShadow
        receiveShadow
        geometry={nodes.ROD.geometry}
        material={mat("ROD", materials["Opal.001"], highlighted.opal)}
        position={pos(base.rod, dir.rod, explode, distByPart.rod)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        name="SPRING"
        castShadow
        receiveShadow
        geometry={nodes.SPRING.geometry}
        material={mat(
          "SPRING",
          materials["BlueWallPaintGlossy.001"],
          highlighted.blue,
        )}
        position={pos(base.spring, dir.spring, explode, distByPart.spring)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />
    </group>
  );
}

useGLTF.preload("/models/Suspension.glb");
