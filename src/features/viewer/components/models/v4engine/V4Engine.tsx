import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";
import { pos } from "./v4engine.explode";
import { createV4MaterialResolver } from "./V4Engine.materials";
import { usePartStore } from "@/store/partStore";
import { useEffect, useMemo } from "react";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

type ModelProps = ThreeElements["group"] & {
  explode?: number;
};

export function V4Engine({
  explode = 0,
  url = "/models/V4_Engine.glb",
  ...props
}: ModelProps & { url?: string }) {
  const { nodes, materials } = useGLTF(url) as unknown as GLTFResult;
  const { part } = usePartStore(); // 선택된 부품 가져오기

  // material resolver 생성
  const mat = useMemo(
    () =>
      createV4MaterialResolver(() => part?.name ?? null, {
        // 현재 선택된 부품 이름을 resolver에게 전달
        emissiveIntensity: 1.0, // 선택된 부품의 하이라이트 밝기
        ghostOpacity: 0.08, // 선택되지 않은 부품의 투명도
      }),
    [part?.name], // 선택된 부품이 바뀔 때만 새로 생성
  );

  useEffect(() => () => mat.dispose(), [mat]);

  return (
    <group {...props} dispose={null} scale={0.2}>
      <group
        name="crankshaft"
        position={pos("solid-1001", explode)} // 여기만 고유 키로
        rotation={[0, Math.PI / 2, 0]}
        scale={0.1}
      >
        <mesh
          name="crankshaft"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1001"].geometry} // 노드는 glb에 있는걸로 동일하게 가야함
          material={mat.resolve("crankshaft", materials["M198193188"])}
        />
        <mesh
          name="crankshaft"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1001_1"].geometry}
          material={mat.resolve("crankshaft", materials["M165158150"])}
        />
      </group>

      <mesh
        name="connecting-rod"
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod"].geometry}
        material={mat.resolve("connecting-rod", materials["M199194189.001"])}
        position={pos("connecting-rod", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <mesh
        name="piston"
        castShadow
        receiveShadow
        geometry={nodes["Piston"].geometry}
        material={mat.resolve("piston", materials["M229234237"])}
        position={pos("piston", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <group
        name="connecting-rod-cap"
        /**
         * 고유 키로 사용하는 이유
         * - 아까 다 connecting-rod-cap으로 지정해서 같은 위치로 등록이 되어 겹침
         * - 그러다 보니 하이라이트도 한 개로 보임
         * -> 키는 각각 다르게 설정하여 위치와 하이라이트를 다르게 설정
         */
        position={pos("solid-1004", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      >
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1004"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M199194189.002"],
          )}
        />
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1004_1"].geometry}
          material={mat.resolve("connecting-rod-cap", materials["M202209238"])}
        />
      </group>

      <mesh
        name="piston-pin"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin"].geometry}
        material={mat.resolve("piston-pin", materials["M229229229"])}
        position={pos("piston-pin", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring"].geometry}
        material={mat.resolve("piston-ring", materials["M228233237"])}
        position={pos("piston-ring", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring001"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring001"].geometry}
        material={mat.resolve("piston-ring001", materials["M228233237.001"])}
        position={pos("piston-ring001", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="pison-ring002"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring002"].geometry}
        material={mat.resolve("piston-ring002", materials["M228233237.002"])}
        position={pos("piston-ring002", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt"].geometry}
        material={mat.resolve("conrod-bolt", materials["M198193188.001"])}
        position={pos("conrod-bolt", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt001"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt001"].geometry}
        material={mat.resolve("conrod-bolt001", materials["M198193188.002"])}
        position={pos("conrod-bolt001", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <mesh
        name="piston-ring003"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring003"].geometry}
        material={mat.resolve("piston-ring003", materials["M228233237.003"])}
        position={pos("piston-ring003", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring004"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring004"].geometry}
        material={mat.resolve("piston-ring004", materials["M228233237.004"])}
        position={pos("piston-ring004", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring005"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring005"].geometry}
        material={mat.resolve("piston-ring005", materials["M228233237.005"])}
        position={pos("piston-ring005", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-pin001"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin001"].geometry}
        material={mat.resolve("piston-pin001", materials["M229229229.001"])}
        position={pos("piston-pin001", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-001"
        castShadow
        receiveShadow
        geometry={nodes["Piston001"].geometry}
        material={mat.resolve("piston-001", materials["M229234237.001"])}
        position={pos("piston-001", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt002"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt002"].geometry}
        material={mat.resolve("conrod-bolt002", materials["M198193188.003"])}
        position={pos("conrod-bolt002", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt003"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt003"].geometry}
        material={mat.resolve("conrod-bolt003", materials["M198193188.004"])}
        position={pos("conrod-bolt003", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <group
        name="connecting-rod-cap"
        position={pos("solid-1018", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      >
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1018"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M199194189.003"],
          )}
        />
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1018_1"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M202209238.001"],
          )}
        />
      </group>

      <mesh
        name="connecting-rod001"
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod001"].geometry}
        material={mat.resolve("connecting-rod001", materials["M199194189.004"])}
        position={pos("connecting-rod001", explode)}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />

      <mesh
        name="piston-002"
        castShadow
        receiveShadow
        geometry={nodes["Piston002"].geometry}
        material={mat.resolve("piston-002", materials["M229234237.002"])}
        position={pos("piston-002", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring006"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring006"].geometry}
        material={mat.resolve("piston-ring006", materials["M228233237.006"])}
        position={pos("piston-ring006", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring007"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring007"].geometry}
        material={mat.resolve("piston-ring007", materials["M228233237.007"])}
        position={pos("piston-ring007", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring008"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring008"].geometry}
        material={mat.resolve("piston-ring008", materials["M228233237.008"])}
        position={pos("piston-ring008", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-pin002"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin002"].geometry}
        material={mat.resolve("piston-pin002", materials["M229229229.002"])}
        position={pos("piston-pin002", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt004"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt004"].geometry}
        material={mat.resolve("conrod-bolt004", materials["M198193188.005"])}
        position={pos("conrod-bolt004", explode)}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt005"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt005"].geometry}
        material={mat.resolve("conrod-bolt005", materials["M198193188.006"])}
        position={pos("conrod-bolt005", explode)}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />

      <mesh
        name="connecting-rod002"
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod002"].geometry}
        material={mat.resolve("connecting-rod002", materials["M199194189.005"])}
        position={pos("connecting-rod002", explode)}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />

      <group
        name="connecting-rod-cap"
        position={pos("solid-1028", explode)}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      >
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1028"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M199194189.006"],
          )}
        />
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1028_1"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M202209238.002"],
          )}
        />
      </group>

      <mesh
        name="piston-003"
        castShadow
        receiveShadow
        geometry={nodes["Piston003"].geometry}
        material={mat.resolve("piston-003", materials["M229234237.003"])}
        position={pos("piston-003", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring009"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring009"].geometry}
        material={mat.resolve("piston-ring009", materials["M228233237.009"])}
        position={pos("piston-ring009", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring010"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring010"].geometry}
        material={mat.resolve("piston-ring010", materials["M228233237.010"])}
        position={pos("piston-ring010", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-ring011"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring011"].geometry}
        material={mat.resolve("piston-ring011", materials["M228233237.011"])}
        position={pos("piston-ring011", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="piston-pin003"
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin003"].geometry}
        material={mat.resolve("piston-pin003", materials["M229229229.003"])}
        position={pos("piston-pin003", explode)}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt006"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt006"].geometry}
        material={mat.resolve("conrod-bolt006", materials["M198193188.007"])}
        position={pos("conrod-bolt006", explode)}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />

      <mesh
        name="conrod-bolt007"
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt007"].geometry}
        material={mat.resolve("conrod-bolt007", materials["M198193188.008"])}
        position={pos("conrod-bolt007", explode)}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />

      <mesh
        name="connecting-rod003"
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod003"].geometry}
        material={mat.resolve("connecting-rod003", materials["M199194189.007"])}
        position={pos("connecting-rod003", explode)}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />

      <group
        name="connecting-rod-cap"
        position={pos("solid-1037", explode)}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      >
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1037"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M199194189.008"],
          )}
        />
        <mesh
          name="connecting-rod-cap"
          castShadow
          receiveShadow
          geometry={nodes["솔리드1037_1"].geometry}
          material={mat.resolve(
            "connecting-rod-cap",
            materials["M202209238.003"],
          )}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/V4_Engine.glb");
