import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";

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

  return (
    <group {...props} dispose={null} scale={0.2}>
      <group rotation={[0, Math.PI / 2, 0]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1001"].geometry}
          material={materials["M198193188"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1001_1"].geometry}
          material={materials["M165158150"]}
        />
      </group>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod"].geometry}
        material={materials["M199194189.001"]}
        position={[-0.043, 1.524, -1.544]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston"].geometry}
        material={materials["M229234237"]}
        position={[-0.048, 1.243, -1.55]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <group
        position={[0.098, -0.471, -1.588]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1004"].geometry}
          material={materials["M199194189.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1004_1"].geometry}
          material={materials["M202209238"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin"].geometry}
        material={materials["M229229229"]}
        position={[-0.042, 1.505, -1.134]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring"].geometry}
        material={materials["M228233237"]}
        position={[-0.054, 1.793, -1.538]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring001"].geometry}
        material={materials["M228233237.001"]}
        position={[-0.056, 2.023, -1.533]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring002"].geometry}
        material={materials["M228233237.002"]}
        position={[-0.055, 1.903, -1.535]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt"].geometry}
        material={materials["M198193188.001"]}
        position={[0.456, -0.155, -1.601]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt001"].geometry}
        material={materials["M198193188.002"]}
        position={[-0.301, -0.209, -1.562]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring003"].geometry}
        material={materials["M228233237.003"]}
        position={[-0.067, 2.781, -2.661]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring004"].geometry}
        material={materials["M228233237.004"]}
        position={[-0.068, 2.901, -2.658]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring005"].geometry}
        material={materials["M228233237.005"]}
        position={[-0.066, 2.671, -2.663]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin001"].geometry}
        material={materials["M229229229.001"]}
        position={[-0.054, 2.382, -2.259]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston001"].geometry}
        material={materials["M229234237.001"]}
        position={[-0.061, 2.121, -2.675]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt002"].geometry}
        material={materials["M198193188.003"]}
        position={[-0.314, 0.669, -2.687]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt003"].geometry}
        material={materials["M198193188.004"]}
        position={[0.443, 0.723, -2.726]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <group
        position={[0.085, 0.407, -2.713]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1018"].geometry}
          material={materials["M199194189.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1018_1"].geometry}
          material={materials["M202209238.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod001"].geometry}
        material={materials["M199194189.004"]}
        position={[-0.055, 2.401, -2.669]}
        rotation={[0.018, 0.053, 0.07]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston002"].geometry}
        material={materials["M229234237.002"]}
        position={[-0.155, 2.216, -3.891]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring006"].geometry}
        material={materials["M228233237.006"]}
        position={[-0.16, 2.766, -3.879]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring007"].geometry}
        material={materials["M228233237.007"]}
        position={[-0.162, 2.996, -3.874]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring008"].geometry}
        material={materials["M228233237.008"]}
        position={[-0.161, 2.876, -3.877]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin002"].geometry}
        material={materials["M229229229.002"]}
        position={[-0.148, 2.477, -3.476]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt004"].geometry}
        material={materials["M198193188.005"]}
        position={[0.277, 0.797, -3.854]}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt005"].geometry}
        material={materials["M198193188.006"]}
        position={[-0.482, 0.782, -3.851]}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod002"].geometry}
        material={materials["M199194189.005"]}
        position={[-0.136, 2.499, -3.895]}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      />
      <group
        position={[-0.097, 0.5, -3.845]}
        rotation={[-0.025, 0.004, 0.02]}
        scale={0.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1028"].geometry}
          material={materials["M199194189.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1028_1"].geometry}
          material={materials["M202209238.002"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston003"].geometry}
        material={materials["M229234237.003"]}
        position={[-0.242, 1.422, -4.898]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring009"].geometry}
        material={materials["M228233237.009"]}
        position={[-0.249, 2.082, -4.884]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring010"].geometry}
        material={materials["M228233237.010"]}
        position={[-0.25, 2.202, -4.881]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Ring011"].geometry}
        material={materials["M228233237.011"]}
        position={[-0.248, 1.972, -4.886]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Piston_Pin003"].geometry}
        material={materials["M229229229.003"]}
        position={[-0.236, 1.683, -4.482]}
        rotation={[0.021, 0.023, 0.01]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt006"].geometry}
        material={materials["M198193188.007"]}
        position={[-0.353, -0.109, -4.953]}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Conrod_Bolt007"].geometry}
        material={materials["M198193188.008"]}
        position={[0.395, 0.017, -5.003]}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Connecting_Rod003"].geometry}
        material={materials["M199194189.007"]}
        position={[-0.258, 1.639, -4.893]}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      />
      <group
        position={[0.068, -0.332, -4.992]}
        rotation={[0.038, 0.073, 0.164]}
        scale={0.1}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1037"].geometry}
          material={materials["M199194189.008"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["솔리드1037_1"].geometry}
          material={materials["M202209238.003"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/V4_Engine.glb");
