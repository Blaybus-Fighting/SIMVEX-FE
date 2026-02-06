import * as THREE from "three";
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";

/**
 * glTF 타입 정의
 * nodes / materials 구조를 명시해줘야 TS 에러가 안 남
 */
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

type ModelProps = ThreeElements["group"] & {
  /**
   * 분해도: 0 ~ 1
   * - 슬라이더가 0~100이면 부모에서 explodePct / 100 해서 내려주세요.
   */
  explode?: number;
};

export function Suspension({ explode = 0, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF(
    "/models/Suspension.glb",
  ) as unknown as GLTFResult;

  /**
   * 원래 위치들(base) - gltfjsx 코드의 값을 그대로 사용
   */
  const base = useMemo(
    () => ({
      // Solid1005 + Solid1005_1은 한 덩어리 (gltfjsx의 group position)
      solidGroup: new THREE.Vector3(-0.066, -0.19, 0.736),

      // 아래는 gltfjsx의 각 mesh position
      nit: new THREE.Vector3(0.017, 0.31, -0.184),
      nut: new THREE.Vector3(0.017, 0.31, -0.184),
      rod: new THREE.Vector3(0.017, 0.31, -0.184),
      spring: new THREE.Vector3(0.017, 0.31, -0.184),
    }),
    [],
  );

  /**
   * 분해 방향(dir)
   * - 값 바꾸면 분해 방향 바뀜
   */
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

  /**
   * 분해 거리 (여기 숫자들만 조절하면 됨)
   * - 전체적으로 줄이고 싶으면 전부 같이 줄이기
   */
  const distByPart = useMemo(
    () => ({
      solidGroup: 0.1,
      nit: 0.14,
      nut: 0.12,
      rod: 0.16,
      spring: 0.18,
    }),
    [],
  );

  /**
   * 위치 계산
   * base + dir * (explode * dist)
   */
  const pos = useMemo(() => {
    return (
      baseV: THREE.Vector3,
      dirV: THREE.Vector3,
      t: number,
      dist: number,
    ) => {
      const v = baseV.clone().add(dirV.clone().multiplyScalar(t * dist));

      // 씬 안에서만 보이게 클램프 (원하면 숫자 조절)
      v.x = THREE.MathUtils.clamp(v.x, -0.6, 0.6);
      v.y = THREE.MathUtils.clamp(v.y, -0.6, 0.6);
      v.z = THREE.MathUtils.clamp(v.z, -0.6, 0.6);

      return [v.x, v.y, v.z] as [number, number, number];
    };
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Solid1005 + Solid1005_1 (한 덩어리) - gltfjsx의 rotation을 그대로 사용 */}
      <group
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
          castShadow
          receiveShadow
          geometry={nodes.Solid1005.geometry}
          material={materials["AnodizedBlack.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Solid1005_1.geometry}
          material={materials["ChromePolished.001"]}
        />
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NIT.geometry}
        material={materials["LightRed.002"]}
        position={pos(base.nit, dir.nit, explode, distByPart.nit)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NUT.geometry}
        material={materials["LightRed.003"]}
        position={pos(base.nut, dir.nut, explode, distByPart.nut)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ROD.geometry}
        material={materials["Opal.001"]}
        position={pos(base.rod, dir.rod, explode, distByPart.rod)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SPRING.geometry}
        material={materials["BlueWallPaintGlossy.001"]}
        position={pos(base.spring, dir.spring, explode, distByPart.spring)}
        rotation={[1.582, 1.403, 0.493]}
        scale={0.1}
      />
    </group>
  );
}

useGLTF.preload("/models/Suspension.glb");
