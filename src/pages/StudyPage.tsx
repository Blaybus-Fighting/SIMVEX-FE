import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
// import { InspectorPanel } from "@/features/panels/inspector/InspectorPanel";

export default function StudyPage() {
  return (
    <div className="h-screen w-full bg-background-400 p-8 flex justify-center items-center gap-6">

      {/* 1. 왼쪽: 3D 뷰어 영역 예시 */}
      {/* <div className="flex-1 h-full rounded-2xl bg-black/20" /> */}

      {/* 2. 오른쪽: 인스펙터 (기계/부품 정보) 예시 */}
      {/*<div className="w-[400px] h-[700px] shrink-0">
        <InspectorPanel/>
      </div>*/}

      {/* 3. 중앙: 워크스페이스 (노트/AI) */}
      <div className="w-[400px] h-[700px] shrink-0">
        <WorkspacePanel/>
      </div>

    </div>
  );
}