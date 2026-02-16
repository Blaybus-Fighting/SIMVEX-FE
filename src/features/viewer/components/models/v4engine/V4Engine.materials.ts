// 선택한 부품 하이라이트 + 나머지 불투명 처리용
import * as THREE from "three";
import type { V4PartName } from "./v4engine.explode";

/**
 * V4Engine.glb의 mesh/groupd name 규칙에 맞춘 선택 하이라이트 로직
 *
 * - 부품 미선택 시 원래 재질 그대로
 * - 부품 선택 시
 *      - 선택된 name: original clone + emissive 하이라이트
 *      - 나머지: ghost(반투명)
 *
 */

export type V4HighlightMaterialOptions = {
  ghostOpacity?: number; // 반투명도
  emissiveIntensity?: number; // 하이라이트 밝기 강도
  ghostDepthWrite?: boolean; // deptWrite 여부(기본은 false)
};

// 외부에서 사용하는 resolver 타입
export type V4MaterialResolver = {
  ghostMaterial: THREE.MeshStandardMaterial;

  // mesh/group의 name과 원본 material을 전달하면
  // 현재 선택 상태(true/false)에 맞는 material을 반환
  resolve: (
    meshOrPartName: V4PartName | string,
    original: THREE.Material,
  ) => THREE.Material;
  dispose: () => void;
};

// name을 비교 가능한 키로 정규화
export const normalizeV4Name = (s: string) => {
  if (!s) return "";

  let v = s.toLowerCase(); // 소문자로 변환
  v = v.replace(/[\s\-_]/g, ""); // 공백/구분자 제거
  v = v.replace(/\d+$/g, ""); // 끝의 숫자 suffix 제거(ex. 001/002/1018 등)
  v = v.replace(/[^a-z0-9]/g, ""); // 남아있을 수 있는 특수문자 제거

  return v;
};

// 선택 판단
export const isSelected = (
  pickedPartName: string | null | undefined,
  targetName: string,
) => {
  if (!pickedPartName) return true; // 아무것도 선택 안하면 전부 정상 표시
  return normalizeV4Name(pickedPartName) === normalizeV4Name(targetName); // 정규화 후 문자열 비교
};

// resolver 생성 함수
export function createV4MaterialResolver(
  getPickedName: () => string | null | undefined,
  opts: V4HighlightMaterialOptions = {},
): V4MaterialResolver {
  // 기본값
  const {
    ghostOpacity = 0.08,
    emissiveIntensity = 1.0,
    ghostDepthWrite = false,
  } = opts;

  // 선택되지 않은 부품에 대한 설정
  const ghostMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: ghostOpacity,
    depthWrite: ghostDepthWrite,
    metalness: 0,
    roughness: 1,
  });
  // highlight clone 캐시: 원본 material uuid -> clone
  // 캐시 사용 이유: 매번 clone하면 메모리 낭비, 같은 material은 한 번만 clone
  const highlightCache = new Map<string, THREE.Material>();

  // 하이라이트 material 생성
  const makeHighlighted = (m: THREE.Material) => {
    // MeshStandardMaterial만 emissive 가능
    if (!(m instanceof THREE.MeshStandardMaterial)) return m;

    // 이미 clone이 되어있으면 재사용
    const cached = highlightCache.get(m.uuid);
    if (cached) return cached;

    // 원본 clone
    const c = m.clone();

    // 원래 색상을 하이라이트로 사용 -> 색 변화 없이 밝아짐
    c.emissive = c.color.clone();
    c.emissiveIntensity = emissiveIntensity;

    highlightCache.set(m.uuid, c);
    return c;
  };

  // 실제 material 결정 로직
  const resolve = (
    meshOrPartName: V4PartName | string,
    original: THREE.Material,
  ) => {
    const pickedName = getPickedName();
    // 선택이 없으면 원본 그대로 유지
    if (!pickedName) return original;

    // target은 현재 mesh/group의 name
    const target = String(meshOrPartName);

    if (isSelected(pickedName, target)) return makeHighlighted(original); // 선택된 부품만 하이라이트
    return ghostMaterial; // 없으면 반투명
  };

  // 메모리 정리 함수
  // clone된 highlight material만 dispose
  const dispose = () => {
    for (const m of highlightCache.values()) {
      // clone만 정리(원본은 dispose하면 안됨)
      if (m instanceof THREE.Material) m.dispose();
    }
    highlightCache.clear();
    ghostMaterial.dispose();
  };

  return { ghostMaterial, resolve, dispose };
}
