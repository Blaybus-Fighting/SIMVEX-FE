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
    Pin_9: THREE.Mesh;
    Pin_8: THREE.Mesh;
    Pin_7: THREE.Mesh;
    Pin_6: THREE.Mesh;
    Pin_5: THREE.Mesh;
    Pin_4: THREE.Mesh;
    Pin_3: THREE.Mesh;
    Pin_2: THREE.Mesh;
    Pin_10: THREE.Mesh;
    Pin: THREE.Mesh;
    Link_2: THREE.Mesh;
    Link_1: THREE.Mesh;
    Gripper: THREE.Mesh;
    Gear_Link_2: THREE.Mesh;
    Gear_Link_1: THREE.Mesh;
    Base_Plate: THREE.Mesh;
    Base_Mounting_bracket: THREE.Mesh;
    Base_Gear: THREE.Mesh;
    Glipper_2: THREE.Mesh;
  };
  materials: {
    "ChromePolished.011": THREE.MeshStandardMaterial;
    "ChromePolished.012": THREE.MeshStandardMaterial;
    "ChromePolished.013": THREE.MeshStandardMaterial;
    "ChromePolished.015": THREE.MeshStandardMaterial;
    "ChromePolished.014": THREE.MeshStandardMaterial;
    "ChromePolished.016": THREE.MeshStandardMaterial;
    "ChromePolished.017": THREE.MeshStandardMaterial;
    "ChromePolished.018": THREE.MeshStandardMaterial;
    "ChromePolished.010": THREE.MeshStandardMaterial;
    "ChromePolished.019": THREE.MeshStandardMaterial;
    "Cyan.002": THREE.MeshStandardMaterial;
    "Cyan.003": THREE.MeshStandardMaterial;
    "LightRed.003": THREE.MeshStandardMaterial;
    "Orange.002": THREE.MeshStandardMaterial;
    "OrangeRed.001": THREE.MeshStandardMaterial;
    "ChromePolishedBlack.001": THREE.MeshStandardMaterial;
    "ChromePolishedBlue.002": THREE.MeshStandardMaterial;
    "GlossyBlack.002": THREE.MeshStandardMaterial;
    "LightRed.004": THREE.MeshStandardMaterial;
  };
};

type ModelProps = ThreeElements["group"] & {
  /**
   * 분해도: 0 ~ 1
   * - 슬라이더가 0~100이면 부모에서 explodePct / 100 해서 내려주세요.
   */
  explode?: number;
};

type PartKey =
  | "Pin_9"
  | "Pin_8"
  | "Pin_7"
  | "Pin_6"
  | "Pin_5"
  | "Pin_4"
  | "Pin_3"
  | "Pin_2"
  | "Pin_10"
  | "Pin"
  | "Link_2"
  | "Link_1"
  | "Gripper"
  | "Gear_Link_2"
  | "Gear_Link_1"
  | "Base_Plate"
  | "Base_Mounting_bracket"
  | "Base_Gear"
  | "Glipper_2";

export function RobotGlipper({ explode = 0, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF(
    "/models/Robot Glipper.glb",
  ) as unknown as GLTFResult;

  /**
   * 원래 위치들(base) - gltfjsx 코드 값 그대로
   * - position이 없는 Base_Plate는 (0,0,0)으로 둠
   */
  const base = useMemo(
    () =>
      ({
        Pin_9: new THREE.Vector3(-0.04, 0.02, 0.06),
        Pin_8: new THREE.Vector3(-0.69, 0.01, -0.13),
        Pin_7: new THREE.Vector3(-0.69, 0.01, 0.13),
        Pin_6: new THREE.Vector3(-0.87, 0.005, 0.05),
        Pin_5: new THREE.Vector3(-0.57, 0.02, -0.055),
        Pin_4: new THREE.Vector3(-0.57, 0.02, 0.05),
        Pin_3: new THREE.Vector3(-0.87, 0.005, -0.055),
        Pin_2: new THREE.Vector3(-0.38, 0.022, -0.135),
        Pin_10: new THREE.Vector3(-0.04, 0.02, -0.06),
        Pin: new THREE.Vector3(-0.38, 0.022, 0.135),
        Link_2: new THREE.Vector3(-0.72, 0.022, 0.05),
        Link_1: new THREE.Vector3(-0.72, 0.022, -0.055),
        Gripper: new THREE.Vector3(-0.86, 0.001, -0.01),
        Gear_Link_2: new THREE.Vector3(-0.38, 0.046, 0.135),
        Gear_Link_1: new THREE.Vector3(-0.38, 0.033, -0.135),
        Base_Plate: new THREE.Vector3(0, 0, 0),
        Base_Mounting_bracket: new THREE.Vector3(0.05, 0.04, -0.1),
        Base_Gear: new THREE.Vector3(-0.17, -0.015, -0.075),
        Glipper_2: new THREE.Vector3(-0.86, 0.001, 0),
      }) satisfies Record<PartKey, THREE.Vector3>,
    [],
  );

  /**
   * 분해 방향(dir)
   * - 기본은 바깥으로 퍼지게 대충 지정
   * - 원하는 분해 모양대로 마음껏 바꿔도 됨
   */
  const dir = useMemo(
    () =>
      ({
        Pin_9: new THREE.Vector3(1, 0, 0),
        Pin_8: new THREE.Vector3(-1, 0, 0),
        Pin_7: new THREE.Vector3(-1, 0, 0),
        Pin_6: new THREE.Vector3(-1, 0.2, 0),
        Pin_5: new THREE.Vector3(0, 1, 0),
        Pin_4: new THREE.Vector3(0, 1, 0),
        Pin_3: new THREE.Vector3(0, -1, 0),
        Pin_2: new THREE.Vector3(0, 0, -1),
        Pin_10: new THREE.Vector3(1, 0, 0),
        Pin: new THREE.Vector3(0, 0, 1),
        Link_2: new THREE.Vector3(0, 0, 1),
        Link_1: new THREE.Vector3(0, 0, -1),
        Gripper: new THREE.Vector3(-1, 0, 1),
        Glipper_2: new THREE.Vector3(-1, 0, -1),
        Gear_Link_2: new THREE.Vector3(0, 1, 1),
        Gear_Link_1: new THREE.Vector3(0, 1, -1),
        Base_Plate: new THREE.Vector3(0, -1, 0),
        Base_Mounting_bracket: new THREE.Vector3(1, 0.5, 0),
        Base_Gear: new THREE.Vector3(0, -1, 0),
      }) satisfies Record<PartKey, THREE.Vector3>,
    [],
  );

  /**
   * 분해 거리
   * - 이동량 크게 필요 없다 했으니 전체적으로 작게
   * - 여기 숫자만 만져도 분해 느낌 바로 바뀜
   */
  const dist = useMemo(
    () =>
      ({
        Pin_9: 0.56,
        Pin_8: 0.56,
        Pin_7: 0.56,
        Pin_6: 0.56,
        Pin_5: 0.55,
        Pin_4: 0.55,
        Pin_3: 0.56,
        Pin_2: 0.56,
        Pin_10: 0.56,
        Pin: 0.56,
        Link_2: 0.58,
        Link_1: 0.58,
        Gripper: 0.6,
        Gear_Link_2: 0.57,
        Gear_Link_1: 0.57,
        Base_Plate: 0.53,
        Base_Mounting_bracket: 0.55,
        Base_Gear: 0.54,
        Glipper_2: 0.6,
      }) satisfies Record<PartKey, number>,
    [],
  );

  /**
   * 위치 계산
   * base + dir * (explode * dist)
   */
  const pos = useMemo(() => {
    return (key: PartKey) => {
      const v = base[key]
        .clone()
        .add(dir[key].clone().multiplyScalar(explode * dist[key]));

      // 씬 안에서만 보이게 클램프 (원하면 범위 조절)
      v.x = THREE.MathUtils.clamp(v.x, -2, 2);
      v.y = THREE.MathUtils.clamp(v.y, -2, 2);
      v.z = THREE.MathUtils.clamp(v.z, -2, 2);

      return [v.x, v.y, v.z] as [number, number, number];
    };
  }, [base, dir, dist, explode]);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Pin_9"
          castShadow
          receiveShadow
          geometry={nodes.Pin_9.geometry}
          material={materials["ChromePolished.011"]}
          position={pos("Pin_9")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          name="Pin_8"
          castShadow
          receiveShadow
          geometry={nodes.Pin_8.geometry}
          material={materials["ChromePolished.012"]}
          position={pos("Pin_8")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.08, 0.1, 0.1]}
        />
        <mesh
          name="Pin_7"
          castShadow
          receiveShadow
          geometry={nodes.Pin_7.geometry}
          material={materials["ChromePolished.013"]}
          position={pos("Pin_7")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.08, 0.1, 0.1]}
        />
        <mesh
          name="Pin_6"
          castShadow
          receiveShadow
          geometry={nodes.Pin_6.geometry}
          material={materials["ChromePolished.015"]}
          position={pos("Pin_6")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          name="Pin_5"
          castShadow
          receiveShadow
          geometry={nodes.Pin_5.geometry}
          material={materials["ChromePolished.014"]}
          position={pos("Pin_5")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          name="Pin_4"
          castShadow
          receiveShadow
          geometry={nodes.Pin_4.geometry}
          material={materials["ChromePolished.016"]}
          position={pos("Pin_4")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          name="Pin_3"
          castShadow
          receiveShadow
          geometry={nodes.Pin_3.geometry}
          material={materials["ChromePolished.017"]}
          position={pos("Pin_3")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          name="Pin_2"
          castShadow
          receiveShadow
          geometry={nodes.Pin_2.geometry}
          material={materials["ChromePolished.018"]}
          position={pos("Pin_2")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.055, 0.1, 0.1]}
        />
        <mesh
          name="Pin_10"
          castShadow
          receiveShadow
          geometry={nodes.Pin_10.geometry}
          material={materials["ChromePolished.010"]}
          position={pos("Pin_10")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          name="Pin"
          castShadow
          receiveShadow
          geometry={nodes.Pin.geometry}
          material={materials["ChromePolished.019"]}
          position={pos("Pin")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.055, 0.1, 0.1]}
        />
        <mesh
          name="Link_2"
          castShadow
          receiveShadow
          geometry={nodes.Link_2.geometry}
          material={materials["Cyan.002"]}
          position={pos("Link_2")}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Link_1"
          castShadow
          receiveShadow
          geometry={nodes.Link_1.geometry}
          material={materials["Cyan.003"]}
          position={pos("Link_1")}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Gripper"
          castShadow
          receiveShadow
          geometry={nodes.Gripper.geometry}
          material={materials["LightRed.003"]}
          position={pos("Gripper")}
          rotation={[Math.PI / 2, 0, 2.793]}
          scale={0.1}
        />
        <mesh
          name="Gear_Link_2"
          castShadow
          receiveShadow
          geometry={nodes.Gear_Link_2.geometry}
          material={materials["Orange.002"]}
          position={pos("Gear_Link_2")}
          rotation={[Math.PI / 2, 0, 3.019]}
          scale={0.1}
        />
        <mesh
          name="Gear_Link_1"
          castShadow
          receiveShadow
          geometry={nodes.Gear_Link_1.geometry}
          material={materials["OrangeRed.001"]}
          position={pos("Gear_Link_1")}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          name="Base_Plate"
          castShadow
          receiveShadow
          geometry={nodes.Base_Plate.geometry}
          material={materials["ChromePolishedBlack.001"]}
          position={pos("Base_Plate")}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.1}
        />
        <mesh
          name="Base_Mounting_bracket"
          castShadow
          receiveShadow
          geometry={nodes.Base_Mounting_bracket.geometry}
          material={materials["ChromePolishedBlue.002"]}
          position={pos("Base_Mounting_bracket")}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.1}
        />
        <mesh
          name="Base_Gear"
          castShadow
          receiveShadow
          geometry={nodes.Base_Gear.geometry}
          material={materials["GlossyBlack.002"]}
          position={pos("Base_Gear")}
          rotation={[0, 0, Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          name="Glipper_2"
          castShadow
          receiveShadow
          geometry={nodes.Glipper_2.geometry}
          material={materials["LightRed.004"]}
          position={pos("Glipper_2")}
          rotation={[-Math.PI / 2, 0, 2.793]}
          scale={0.1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Robot Glipper.glb");
