// PartThumb3D.tsx
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, useGLTF } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return (
    <Center>
      <primitive object={gltf.scene} />
    </Center>
  );
}

export default function PartThumb3D({ url }: { url: string }) {
  return (
    <div className="h-[86px] w-[86px] overflow-hidden">
      <Canvas camera={{ position: [1.6, 1.2, 1.6], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 3, 2]} />
        <Bounds fit clip observe margin={1.3}>
          <Model url={url} />
        </Bounds>
      </Canvas>
    </div>
  );
}
