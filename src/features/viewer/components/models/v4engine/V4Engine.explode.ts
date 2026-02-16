// 분해도 조절용 파일
import * as THREE from "three";

export type V4PartName = keyof typeof base;

// 부품별 초기 위치
export const base = {
  "solid-1001": new THREE.Vector3(0, 0, 0),

  "connecting-rod": new THREE.Vector3(-0.043, 1.524, -1.544),
  piston: new THREE.Vector3(-0.048, 1.243, -1.55),
  "solid-1004": new THREE.Vector3(0.098, -0.471, -1.588),
  "piston-pin": new THREE.Vector3(-0.042, 1.505, -1.134),

  "piston-ring": new THREE.Vector3(-0.054, 1.793, -1.538),
  "piston-ring001": new THREE.Vector3(-0.056, 2.023, -1.533),
  "piston-ring002": new THREE.Vector3(-0.055, 1.903, -1.535),

  "conrod-bolt": new THREE.Vector3(0.456, -0.155, -1.601),
  "conrod-bolt001": new THREE.Vector3(-0.301, -0.209, -1.562),

  "piston-ring003": new THREE.Vector3(-0.067, 2.781, -2.661),
  "piston-ring004": new THREE.Vector3(-0.068, 2.901, -2.658),
  "piston-ring005": new THREE.Vector3(-0.066, 2.671, -2.663),

  "piston-pin001": new THREE.Vector3(-0.054, 2.382, -2.259),
  "piston-001": new THREE.Vector3(-0.061, 2.121, -2.675),

  "conrod-bolt002": new THREE.Vector3(-0.314, 0.669, -2.687),
  "conrod-bolt003": new THREE.Vector3(0.443, 0.723, -2.726),

  // group name 기준 (원본 코드 group name="sold-1018")
  "solid-1018": new THREE.Vector3(0.085, 0.407, -2.713),
  "connecting-rod001": new THREE.Vector3(-0.055, 2.401, -2.669),

  "piston-002": new THREE.Vector3(-0.155, 2.216, -3.891),
  "piston-ring006": new THREE.Vector3(-0.16, 2.766, -3.879),
  "piston-ring007": new THREE.Vector3(-0.162, 2.996, -3.874),
  "piston-ring008": new THREE.Vector3(-0.161, 2.876, -3.877),
  "piston-pin002": new THREE.Vector3(-0.148, 2.477, -3.476),

  "conrod-bolt004": new THREE.Vector3(0.277, 0.797, -3.854),
  "conrod-bolt005": new THREE.Vector3(-0.482, 0.782, -3.851),
  "connecting-rod002": new THREE.Vector3(-0.136, 2.499, -3.895),

  "solid-1028": new THREE.Vector3(-0.097, 0.5, -3.845),

  "piston-003": new THREE.Vector3(-0.242, 1.422, -4.898),
  "piston-ring009": new THREE.Vector3(-0.249, 2.082, -4.884),
  "piston-ring010": new THREE.Vector3(-0.25, 2.202, -4.881),
  "piston-ring011": new THREE.Vector3(-0.248, 1.972, -4.886),
  "piston-pin003": new THREE.Vector3(-0.236, 1.683, -4.482),

  "conrod-bolt006": new THREE.Vector3(-0.353, -0.109, -4.953),
  "conrod-bolt007": new THREE.Vector3(0.395, 0.017, -5.003),
  "connecting-rod003": new THREE.Vector3(-0.258, 1.639, -4.893),

  "solid-1037": new THREE.Vector3(0.068, -0.332, -4.992),
} as const;

// match 먼저 걸리는 규칙을 적용
type Rule = {
  match: RegExp;
  dist: number;
  dir: THREE.Vector3; // base dir
  /**
   * 같은 카테고리끼리 겹치지 않게 살짝 흩뿌리기 강도 (0~1)
   * - 0이면 모두 동일 방향
   * - 0.3~0.7이면 키마다 약간 다른 방향
   */
  jitter?: number;
};

const RULES: Rule[] = [
  // 큰 덩어리(솔리드): 아래/옆으로 살짝
  {
    match: /^solid-/i,
    dist: 0.55,
    dir: new THREE.Vector3(0.2, -1, 0),
    jitter: 0.25,
  },

  // 링/핀/볼트는 멀리 벌리기 (작은 부품)
  {
    match: /ring/i,
    dist: 1.1,
    dir: new THREE.Vector3(0, 1, 0.35),
    jitter: 0.45,
  },
  { match: /pin/i, dist: 1.0, dir: new THREE.Vector3(0, 0, 1), jitter: 0.45 },
  { match: /bolt/i, dist: 1.0, dir: new THREE.Vector3(1, 0, 0), jitter: 0.55 },

  // 컨로드
  {
    match: /connecting-rod/i,
    dist: 0.9,
    dir: new THREE.Vector3(-1, 0.2, 0),
    jitter: 0.35,
  },

  // 피스톤(링/핀 제외)
  {
    match: /^piston$|^piston-\d+/i,
    dist: 0.85,
    dir: new THREE.Vector3(0, 1, 0),
    jitter: 0.25,
  },
];

/** fallback */
const DEFAULT_RULE: Rule = {
  match: /.*/,
  dist: 0.8,
  dir: new THREE.Vector3(0, 1, 0),
  jitter: 0.2,
};

function findRule(key: string): Rule {
  return RULES.find((r) => r.match.test(key)) ?? DEFAULT_RULE;
}

/** 키 기반 deterministic hash (0..1) */
function hash01(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // unsigned -> 0..1
  return (h >>> 0) / 4294967295;
}

/** 규칙 방향 + 키별 살짝 변형(jitter)로 겹침 감소 */
function computeDirForKey(key: string): THREE.Vector3 {
  const rule = findRule(key);
  const v = rule.dir.clone();

  const j = rule.jitter ?? 0;
  if (j > 0) {
    // 키마다 다른 작은 변형 (x/z 방향으로 살짝 흩뿌리기)
    const a = (hash01(key) - 0.5) * 2; // -1..1
    const b = (hash01(key + "#") - 0.5) * 2; // -1..1

    // 같은 카테고리라도 살짝씩 다른 방향으로 퍼지게 함
    v.x += a * j;
    v.z += b * j;
  }

  if (v.lengthSq() < 1e-8) v.set(0, 1, 0);
  return v.normalize();
}

function computeDistForKey(key: string): number {
  return findRule(key).dist;
}

/** 모듈 로드 시 dir/dist 맵 한 번만 생성 */
export const dir: Record<string, THREE.Vector3> = Object.fromEntries(
  Object.keys(base).map((k) => [k, computeDirForKey(k)]),
);

export const distByPart: Record<string, number> = Object.fromEntries(
  Object.keys(base).map((k) => [k, computeDistForKey(k)]),
);

/**
 * position 계산 (Suspension 스타일)
 * pos = base + dir * (explode * dist)
 */
export function pos(
  key: keyof typeof base, // base에 존재하는 키만 허용
  explode: number,
): [number, number, number] {
  const b = base[key];
  const d = dir[key as string] ?? DEFAULT_RULE.dir;
  const dist = distByPart[key as string] ?? DEFAULT_RULE.dist;

  const v = b.clone().add(d.clone().multiplyScalar(explode * dist));

  // clamp는 모델/카메라 스케일에 맞춰 조절 (필요 없으면 삭제 가능)
  v.x = THREE.MathUtils.clamp(v.x, -6, 6);
  v.y = THREE.MathUtils.clamp(v.y, -6, 6);
  v.z = THREE.MathUtils.clamp(v.z, -6, 6);

  return [v.x, v.y, v.z];
}
