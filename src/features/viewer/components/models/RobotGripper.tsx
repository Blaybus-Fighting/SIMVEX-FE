import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";
import { usePartStore } from "@/store/partStore";

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
    Gripper_2: THREE.Mesh;
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
  selectedPart?: string | null;
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
  | "Gripper_2";

export function RobotGripper({
  explode = 0,
  url = "/models/Robot Gripper.glb",
  ...props
}: ModelProps & { url?: string }) {
  const { nodes, materials } = useGLTF(url) as unknown as GLTFResult;
  const { part } = usePartStore(); // 선택한 부품

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

  // 정규화(공백 제거하고 알파벳만 남긴 후 다 대문자로 변환)
  const normalize = (name: string) =>
    name
      .replace(/[^a-zA-Z]/g, "") // 알파벳만 남김
      .toUpperCase(); // 전부 대문자

  const isSelected = (meshName: string) => {
    // true일 경우 하이라이트, false일 경우 투명
    if (!part?.name) return true;

    const picked = normalize(part.name);
    const target = normalize(meshName);

    // 1) 완전 일치
    if (picked === target) return true;

    // 2) 묶음 규칙 (정규화된 prefix 기준)
    if (picked.startsWith("PIN")) {
      return target === "PIN" || target.startsWith("PIN");
    }

    if (picked.startsWith("LINK")) {
      return target.startsWith("LINK");
    }

    if (picked.startsWith("GEARLINK")) {
      return target.startsWith("GEARLINK");
    }

    if (picked.startsWith("BASE")) {
      return target.startsWith("BASE");
    }

    if (picked.startsWith("GRIPPER")) {
      return target.startsWith("GRIPPER");
    }
  };
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
        Gripper_2: new THREE.Vector3(-0.86, 0.001, 0),
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
        Gripper_2: new THREE.Vector3(-1, 0, -1),
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
        Gripper_2: 0.6,
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
          key="28_9"
          name="Pin_9"
          castShadow
          receiveShadow
          geometry={nodes.Pin_9.geometry}
          // 선택될 경우 현재 색상으로, 선택되지 않은 경우 투명색상으로
          material={
            isSelected("Pin_9")
              ? materials["ChromePolished.011"]
              : ghostMaterial
          }
          position={pos("Pin_9")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          key="28_8"
          name="Pin_8"
          castShadow
          receiveShadow
          geometry={nodes.Pin_8.geometry}
          material={
            isSelected("Pin_8")
              ? materials["ChromePolished.012"]
              : ghostMaterial
          }
          position={pos("Pin_8")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.08, 0.1, 0.1]}
        />
        <mesh
          key="28_7"
          name="Pin_7"
          castShadow
          receiveShadow
          geometry={nodes.Pin_7.geometry}
          material={
            isSelected("Pin_7")
              ? materials["ChromePolished.013"]
              : ghostMaterial
          }
          position={pos("Pin_7")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.08, 0.1, 0.1]}
        />
        <mesh
          key="28_6"
          name="Pin_6"
          castShadow
          receiveShadow
          geometry={nodes.Pin_6.geometry}
          material={
            isSelected("Pin_6")
              ? materials["ChromePolished.015"]
              : ghostMaterial
          }
          position={pos("Pin_6")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          key="28_5"
          name="Pin_5"
          castShadow
          receiveShadow
          geometry={nodes.Pin_5.geometry}
          material={
            isSelected("Pin_5")
              ? materials["ChromePolished.014"]
              : ghostMaterial
          }
          position={pos("Pin_5")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          key="28_4"
          name="Pin_4"
          castShadow
          receiveShadow
          geometry={nodes.Pin_4.geometry}
          material={
            isSelected("Pin_4")
              ? materials["ChromePolished.016"]
              : ghostMaterial
          }
          position={pos("Pin_4")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          key="28_3"
          name="Pin_3"
          castShadow
          receiveShadow
          geometry={nodes.Pin_3.geometry}
          material={
            isSelected("Pin_3")
              ? materials["ChromePolished.017"]
              : ghostMaterial
          }
          position={pos("Pin_3")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          key="28_2"
          name="Pin_2"
          castShadow
          receiveShadow
          geometry={nodes.Pin_2.geometry}
          material={
            isSelected("Pin_2")
              ? materials["ChromePolished.018"]
              : ghostMaterial
          }
          position={pos("Pin_2")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.055, 0.1, 0.1]}
        />
        <mesh
          key="28_10"
          name="Pin_10"
          castShadow
          receiveShadow
          geometry={nodes.Pin_10.geometry}
          material={
            isSelected("Pin_10")
              ? materials["ChromePolished.010"]
              : ghostMaterial
          }
          position={pos("Pin_10")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.05, 0.1, 0.1]}
        />
        <mesh
          key="28_1"
          name="Pin"
          castShadow
          receiveShadow
          geometry={nodes.Pin.geometry}
          material={
            isSelected("Pin") ? materials["ChromePolished.019"] : ghostMaterial
          }
          position={pos("Pin")}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.055, 0.1, 0.1]}
        />
        <mesh
          key="27_2"
          name="Link_2"
          castShadow
          receiveShadow
          geometry={nodes.Link_2.geometry}
          material={
            isSelected("Link_2") ? materials["Cyan.002"] : ghostMaterial
          }
          position={pos("Link_2")}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          key="27_1"
          name="Link_1"
          castShadow
          receiveShadow
          geometry={nodes.Link_1.geometry}
          material={
            isSelected("Link_1") ? materials["Cyan.003"] : ghostMaterial
          }
          position={pos("Link_1")}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          key="26"
          name="Gripper"
          castShadow
          receiveShadow
          geometry={nodes.Gripper.geometry}
          material={
            isSelected("Gripper") ? materials["LightRed.003"] : ghostMaterial
          }
          position={pos("Gripper")}
          rotation={[Math.PI / 2, 0, 2.793]}
          scale={0.1}
        />
        <mesh
          key="25"
          name="Gear_Link_2"
          castShadow
          receiveShadow
          geometry={nodes.Gear_Link_2.geometry}
          material={
            isSelected("Gear_Link_2") ? materials["Orange.002"] : ghostMaterial
          }
          position={pos("Gear_Link_2")}
          rotation={[Math.PI / 2, 0, 3.019]}
          scale={0.1}
        />
        <mesh
          key="24"
          name="Gear_Link_1"
          castShadow
          receiveShadow
          geometry={nodes.Gear_Link_1.geometry}
          material={
            isSelected("Gear_Link_1")
              ? materials["OrangeRed.001"]
              : ghostMaterial
          }
          position={pos("Gear_Link_1")}
          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
          scale={0.1}
        />
        <mesh
          key="23"
          name="Base_Plate"
          castShadow
          receiveShadow
          geometry={nodes.Base_Plate.geometry}
          material={
            isSelected("Base_Plate")
              ? materials["ChromePolishedBlack.001"]
              : ghostMaterial
          }
          position={pos("Base_Plate")}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          scale={0.1}
        />
        <mesh
          key="22"
          name="Base_Mounting_bracket"
          castShadow
          receiveShadow
          geometry={nodes.Base_Mounting_bracket.geometry}
          material={
            isSelected("Base_Mounting_bracket")
              ? materials["ChromePolishedBlue.002"]
              : ghostMaterial
          }
          position={pos("Base_Mounting_bracket")}
          rotation={[Math.PI, 0, Math.PI]}
          scale={0.1}
        />
        <mesh
          key="21"
          name="Base_Gear"
          castShadow
          receiveShadow
          geometry={nodes.Base_Gear.geometry}
          material={
            isSelected("Base_Gear")
              ? materials["GlossyBlack.002"]
              : ghostMaterial
          }
          position={pos("Base_Gear")}
          rotation={[0, 0, Math.PI / 2]}
          scale={[0.07, 0.1, 0.1]}
        />
        <mesh
          name="Glipper_2"
          castShadow
          receiveShadow
          geometry={nodes.Gripper_2.geometry}
          material={
            isSelected("Glipper_2") ? materials["LightRed.004"] : ghostMaterial
          }
          position={pos("Gripper_2")}
          rotation={[-Math.PI / 2, 0, 2.793]}
          scale={0.1}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Robot Gripper.glb");
