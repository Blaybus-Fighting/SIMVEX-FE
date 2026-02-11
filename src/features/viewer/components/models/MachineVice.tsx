import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import type { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";
import { usePartStore } from "@/store/partStore";

type ModelProps = ThreeElements["group"] & {
  explode?: number; // 0 ~ 1
  selectedPart?: string | null;
};

type PartKey =
  | "Base"
  | "FixedJaw"
  | "SpindleBase"
  | "MovingJaw"
  | "MovingJawTop"
  | "Guide"
  | "LooseJaw"
  | "Spindle"
  | "Rail"
  | "Rail2";

type GLTFResult = GLTF & {
  nodes: {
    ["Part8-grundplatte"]: THREE.Mesh;
    Part2_Feste_Backe: THREE.Mesh;
    Part4_spindelsockel: THREE.Mesh;
    ["Part5-Spannbacke"]: THREE.Mesh;
    Part1_Fuhrung: THREE.Mesh;
    ["Part3-lose_backe"]: THREE.Mesh;
    ["Part7-TrapezSpindel"]: THREE.Mesh;
    ["Part6-fuhrungschiene"]: THREE.Mesh;
    ["Part5-Spannbacke001"]: THREE.Mesh;
    ["Part6-fuhrungschiene001"]: THREE.Mesh;
  };
  materials: Record<string, THREE.Material>;
};

function makeCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  opts?: { repeat?: [number, number]; rotation?: number },
) {
  if (typeof document === "undefined") {
    const t = new THREE.Texture();
    t.needsUpdate = true;
    return t;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  draw(ctx);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  if (opts?.repeat) tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  if (opts?.rotation) tex.rotation = opts.rotation;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function woodTexture() {
  // 사진처럼 붉은 목재 느낌
  return makeCanvasTexture(
    512,
    512,
    (ctx) => {
      ctx.fillStyle = "#8b4a2d";
      ctx.fillRect(0, 0, 512, 512);

      // 결(가로 방향)
      for (let i = 0; i < 140; i++) {
        const y = Math.random() * 512;
        const h = 1 + Math.random() * 3;
        const a = 0.05 + Math.random() * 0.12;
        ctx.fillStyle = `rgba(40, 15, 5, ${a})`;
        ctx.fillRect(0, y, 512, h);
      }

      // 하이라이트 스트릭
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * 512;
        const a = 0.03 + Math.random() * 0.06;
        ctx.fillStyle = `rgba(255, 210, 170, ${a})`;
        ctx.fillRect(x, 0, 1 + Math.random() * 2, 512);
      }

      // 가장자리 살짝 어둡게
      const g = ctx.createRadialGradient(256, 256, 60, 256, 256, 360);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.18)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
    },
    { repeat: [1.4, 1.4] },
  );
}

function castMetalTexture() {
  // 거친 주물(검정/회색 얼룩) 느낌
  return makeCanvasTexture(
    512,
    512,
    (ctx) => {
      ctx.fillStyle = "#2a2a2a";
      ctx.fillRect(0, 0, 512, 512);

      const img = ctx.getImageData(0, 0, 512, 512);
      const d = img.data;

      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * 55;
        d[i] = THREE.MathUtils.clamp(d[i] + n, 0, 255);
        d[i + 1] = THREE.MathUtils.clamp(d[i + 1] + n, 0, 255);
        d[i + 2] = THREE.MathUtils.clamp(d[i + 2] + n, 0, 255);
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);

      // 미세한 밝은 점(주물 질감)
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let i = 0; i < 22; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * 512,
          Math.random() * 512,
          15 + Math.random() * 55,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    },
    { repeat: [2.2, 2.2] },
  );
}

function brushedMetalTexture() {
  // 회색 가공/브러시드 메탈 느낌
  return makeCanvasTexture(
    1024,
    256,
    (ctx) => {
      ctx.fillStyle = "#6b6b6b";
      ctx.fillRect(0, 0, 1024, 256);

      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 1024;
        const a = 0.03 + Math.random() * 0.06;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x, 0, 1, 256);
      }
      for (let i = 0; i < 420; i++) {
        const x = Math.random() * 1024;
        const a = 0.02 + Math.random() * 0.05;
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fillRect(x, 0, 1, 256);
      }
    },
    { repeat: [4, 2] },
  );
}

function brassTexture() {
  // 황동/스핀들 골드
  return makeCanvasTexture(
    512,
    256,
    (ctx) => {
      ctx.fillStyle = "#b58b26";
      ctx.fillRect(0, 0, 512, 256);

      for (let i = 0; i < 700; i++) {
        const x = Math.random() * 512;
        const a = 0.03 + Math.random() * 0.06;
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x, 0, 1, 256);
      }
      for (let i = 0; i < 260; i++) {
        const x = Math.random() * 512;
        const a = 0.02 + Math.random() * 0.04;
        ctx.fillStyle = `rgba(60,30,0,${a})`;
        ctx.fillRect(x, 0, 1, 256);
      }
    },
    { repeat: [6, 2] },
  );
}

export function MachineVice({
  explode = 0,
  url = "/models/Machine_Vice.glb",
  ...props
}: ModelProps & { url?: string }) {
  const { nodes } = useGLTF(url) as unknown as GLTFResult;
  const { part } = usePartStore();

  // 노드 이름
  const normalizeNodeName = (s: string) =>
    s
      .replace(/^Part\d*/i, "") // 앞의 Part + 바로 붙는 숫자 제거
      .replace(/[-_]/g, "") // - _ 제거
      .replace(/\s+/g, "") // 공백 제거
      .toUpperCase();

  // 실제 선택된 부품 이름
  const normalizePartName = (s: string) =>
    s
      .replace(/\(.*?\)/g, "") // 괄호 안 내용 포함 제거
      .replace(/\s+/g, "") // 공백 제거
      .toUpperCase();

  /** 선택 판정 (묶음 규칙 포함) */
  const isSelected = (nodeName: string) => {
    if (!part) return true;

    const picked = normalizePartName(part.name);
    const target = normalizeNodeName(nodeName);

    return picked === target;
  };

  /** 투명 material */
  const ghostMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        roughness: 1,
        metalness: 0,
      }),
    [],
  );

  const mat = (
    nodeName: string,
    original: THREE.MeshStandardMaterial,
    highlight: THREE.MeshStandardMaterial,
  ) => {
    if (!part) return original;
    if (isSelected(nodeName)) return highlight;
    return ghostMaterial;
  };

  /** 사진 스타일 재질/텍스처 */
  const mats = useMemo(() => {
    const woodMap = woodTexture();
    const castMap = castMetalTexture();
    const brushedMap = brushedMetalTexture();
    const brassMap = brassTexture();

    const wood = new THREE.MeshStandardMaterial({
      map: woodMap,
      roughness: 0.72,
      metalness: 0.05,
    });

    const castIron = new THREE.MeshStandardMaterial({
      map: castMap,
      roughness: 0.88,
      metalness: 0.25,
    });

    const machinedGray = new THREE.MeshStandardMaterial({
      map: brushedMap,
      roughness: 0.32,
      metalness: 0.85,
    });

    const paintedBlack = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0f0f10"),
      roughness: 0.6,
      metalness: 0.15,
    });

    const brass = new THREE.MeshStandardMaterial({
      map: brassMap,
      roughness: 0.28,
      metalness: 0.95,
    });

    return { wood, castIron, machinedGray, paintedBlack, brass };
  }, []);

  /** 선택된 파트에 적용할 하이라이트 머티리얼(원본 clone + emissive) */
  const highlighted = useMemo(() => {
    const make = (m: THREE.MeshStandardMaterial) => {
      const c = m.clone();

      // 색 안 바꾸고 "밝아진 느낌"만 주기
      c.emissive = c.color.clone();

      // 텍스처가 있으면 emissiveMap으로 같이 써주면 더 자연스럽게 밝아짐
      if (c.map) {
        c.emissiveMap = c.map;
        c.emissiveIntensity = 0.9;
      } else {
        c.emissiveIntensity = 1.0;
      }

      return c;
    };

    return {
      wood: make(mats.wood),
      castIron: make(mats.castIron),
      machinedGray: make(mats.machinedGray),
      paintedBlack: make(mats.paintedBlack),
      brass: make(mats.brass),
    };
  }, [mats]);

  /** 상세 부품별 기본 위치 */
  const base = useMemo(
    () =>
      ({
        Base: new THREE.Vector3(0, 0, 0),
        FixedJaw: new THREE.Vector3(1.85, 0, 0),
        SpindleBase: new THREE.Vector3(0, 0, 0.55),
        MovingJaw: new THREE.Vector3(1.67, 0.36, -0.01),
        MovingJawTop: new THREE.Vector3(0.93, 0.36, 0.76),
        Guide: new THREE.Vector3(0.2, 0.3, 0.65),
        LooseJaw: new THREE.Vector3(0.5, 0.36, 0),
        Spindle: new THREE.Vector3(-0.31, 0.43, 0.38),
        Rail: new THREE.Vector3(0.5, 0.15, 0.75),
        Rail2: new THREE.Vector3(0.5, 0.2, 0),
      }) satisfies Record<PartKey, THREE.Vector3>,
    [],
  );

  /** 분해 방향 */
  const dir = useMemo(
    () =>
      ({
        Base: new THREE.Vector3(0, -1, 0),
        FixedJaw: new THREE.Vector3(1, 0, 0),
        SpindleBase: new THREE.Vector3(0, 0, 1),
        MovingJaw: new THREE.Vector3(1, 1, 0),
        MovingJawTop: new THREE.Vector3(1, 1, 0),
        Guide: new THREE.Vector3(1, 1, 0),
        LooseJaw: new THREE.Vector3(-1, 2, -1),
        Spindle: new THREE.Vector3(-1, 0, 0),
        Rail: new THREE.Vector3(0, 0, 1),
        Rail2: new THREE.Vector3(0, 0, -1),
      }) satisfies Record<PartKey, THREE.Vector3>,
    [],
  );

  /** 분해 거리 */
  const dist = useMemo(
    () =>
      ({
        Base: 0.4,
        FixedJaw: 0.5,
        SpindleBase: 0.45,
        MovingJaw: 0.55,
        MovingJawTop: 0.55,
        Guide: 0.55,
        LooseJaw: 0.45,
        Spindle: 0.6,
        Rail: 0.5,
        Rail2: 0.5,
      }) satisfies Record<PartKey, number>,
    [],
  );

  /** 위치 계산 */
  const pos = useMemo(() => {
    return (key: PartKey) => {
      const v = base[key]
        .clone()
        .add(dir[key].clone().multiplyScalar(explode * dist[key]));
      return [v.x, v.y, v.z] as [number, number, number];
    };
  }, [base, dir, dist, explode]);

  return (
    <group {...props} dispose={null} scale={0.5}>
      {/* 목재 베이스 */}
      <mesh
        geometry={nodes["Part8-grundplatte"].geometry}
        material={mat("Part8-grundplatte", mats.wood, highlighted.wood)}
        position={pos("Base")}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />

      {/* 고정 죠(거친 주물) */}
      <mesh
        geometry={nodes.Part2_Feste_Backe.geometry}
        material={mat("Part2_Feste_Backe", mats.castIron, highlighted.castIron)}
        position={pos("FixedJaw")}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.1}
      />

      {/* 스핀들 지지대(주물) */}
      <mesh
        geometry={nodes.Part4_spindelsockel.geometry}
        material={mat("SpindleBase", mats.castIron, highlighted.castIron)}
        position={pos("SpindleBase")}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.1}
      />

      {/* 이동 블록(검정 도장 느낌) */}
      <mesh
        geometry={nodes["Part5-Spannbacke"].geometry}
        material={mat(
          "Part5-Spannbacke",
          mats.paintedBlack,
          highlighted.paintedBlack,
        )}
        position={pos("MovingJaw")}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.1}
      />

      {/* 상단 회색 가공 블록(사진의 회색 부분) */}
      <mesh
        geometry={nodes["Part5-Spannbacke001"].geometry}
        material={mat(
          "Part5-Spannbacke001",
          mats.machinedGray,
          highlighted.machinedGray,
        )}
        position={pos("MovingJawTop")}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.1}
      />

      {/* 가이드(회색 가공 메탈) */}
      <mesh
        geometry={nodes.Part1_Fuhrung.geometry}
        material={mat(
          "Part1_Fuhrung",
          mats.machinedGray,
          highlighted.machinedGray,
        )}
        position={pos("Guide")}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.1}
      />

      {/* 이동 죠(거친 주물) */}
      <mesh
        geometry={nodes["Part3-lose_backe"].geometry}
        material={mat("Part3-lose_backe", mats.castIron, highlighted.castIron)}
        position={pos("LooseJaw")}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.1}
      />

      {/* 스핀들(황동) */}
      <mesh
        geometry={nodes["Part7-TrapezSpindel"].geometry}
        material={mat("Part7-TrapezSpindel", mats.brass, highlighted.brass)}
        position={pos("Spindle")}
        rotation={[2.321, Math.PI / 2, 0]}
        scale={0.12}
      />

      {/* 레일/바디(검정 도장) */}
      <mesh
        geometry={nodes["Part6-fuhrungschiene"].geometry}
        material={mat(
          "Part6-fuhrungschiene",
          mats.paintedBlack,
          highlighted.paintedBlack,
        )}
        position={pos("Rail")}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.1}
      />

      <mesh
        geometry={nodes["Part6-fuhrungschiene001"].geometry}
        material={mat(
          "Part6-fuhrungschiene001",
          mats.paintedBlack,
          highlighted.paintedBlack,
        )}
        position={pos("Rail2")}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.1}
      />
    </group>
  );
}

useGLTF.preload("/models/Machine_Vice.glb");
