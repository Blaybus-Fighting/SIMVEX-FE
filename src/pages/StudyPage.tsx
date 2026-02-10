// src/pages/StudyPage.tsx
import { useEffect, useState } from "react";
import MachinePanel from "@/features/machine/MachinePanel.tsx";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDetailModel } from "@/api/modelApi";
import ApiLoadingBar from "@/components/common/ApiLoadingBar";
import { useDetailModelStore } from "@/store/modelStore";
import Rendering3D from "@/features/viewer/components/Rendering3D";
import { usePartListStore, usePartStore } from "@/store/partStore";
import HeaderFrame from "@/components/layout/HeaderFrame";
import ArrowBack from "@/assets/icons/arrow_back.svg?react";
import UserMenu from "@/components/common/UserMenu";

export default function StudyPage() {
  const navigate = useNavigate();
  const {model, setModel} = useDetailModelStore();
  const clearPartList = usePartListStore((state) => state.clear);
  const clearPart = usePartStore((state) => state.clear);
  const [loading, setLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const modelId = Number(searchParams.get("modelId"));

  // 페이지 나갈 때 parts와 part 초기화
  useEffect(() => {
    return () => {
      clearPartList();
      clearPart();
      setSelectedPart(null);
    };
  }, [clearPartList, clearPart]);

  useEffect(() => {
    // 모델 객체 상세 조회
    const fetchDetailModel = async () => {
      try {
        setLoading(true);
        const res = await getDetailModel(modelId);

        if (res.isSuccess) {
          console.log("성공: ", res);
          setModel(res.data);
        } else {
          console.log("에러 데이터: ", res.error);
        }
      } catch (error) {
        console.error("모델 객체 API 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailModel();
  }, [modelId, setModel]);

  // 로딩 중일 때만 보여줌
  if (loading) {
    return (
      <>
        <ApiLoadingBar loading/>
      </>
    );
  }

  return (
    // 전체 화면, 배경 어둡게
    <div className="flex flex-col w-full h-screen overflow-hidden">

      {/* 1. 헤더 조립 (다크 모드 커스텀) */}
      <HeaderFrame className="bg-background-300 border-slate-700 text-white h-14 min-h-[3.5rem] relative">

        {/* 왼쪽: 뒤로가기 */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <ArrowBack className="w-5 h-5 fill-white"/>
          </button>
        </div>

        {/* 중앙: 기계 이름 (절대 위치로 중앙 정렬) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="font-semibold text-lg">
            {model?.name || "기계 이름"}
          </span>
        </div>

        {/* 오른쪽: 저장/옵션 버튼 */}
        <div className="flex items-center gap-2 z-10">
          <UserMenu/>
        </div>
      </HeaderFrame>

      {/* 2. 작업 영역 (3D + 패널) */}
      {/* 부모 flex-1로 변경하여 남은 공간 채움 */}
      <div className="flex flex-1 p-2 gap-2 overflow-hidden">

        {/* 3D 뷰어 영역: 1.5 비율 (flex-[1.5]) */}
        <div className="flex-[1.5] min-w-0 relative bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
          {model && <Rendering3D modelName={model.name}/>}
        </div>

        {/* 기계/부품 패널: 1 비율 */}
        <div className="flex-1 min-w-0">
          <MachinePanel selectedPart={selectedPart} onPartSelect={setSelectedPart}/>
        </div>

        {/* 노트/AI 패널: 1 비율 */}
        <div className="flex-1 min-w-0">
          {model && (
            <WorkspacePanel modelId={model.id}/>
          )}
        </div>
      </div>
    </div>
  );
}