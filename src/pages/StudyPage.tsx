// src/pages/StudyPage.tsx
import { useEffect, useState } from "react";
import MachinePanel from "@/features/machine/MachinePanel.tsx";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import { useSearchParams } from "react-router-dom";
import { getDetailModel } from "@/api/modelApi";
import ApiLoadingBar from "@/components/common/ApiLoadingBar";
import { useDetailModelStore } from "@/store/modelStore";
import Rendering3D from "@/features/viewer/components/Rendering3D";
import { usePartListStore, usePartStore } from "@/store/partStore";

export default function StudyPage() {
  const { model, setModel } = useDetailModelStore();
  const clearPartList = usePartListStore((state) => state.clear);
  const clearPart = usePartStore((state) => state.clear);

  const [loading, setLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const [searchParams] = useSearchParams(); // query string 방식: 새로고침 후에도 값 유지됨

  const modelId = Number(searchParams.get("modelId")); // modelId 가져오기

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
        <ApiLoadingBar loading />
      </>
    );
  }

  return (
    <div className="flex w-full h-full p-2 gap-4 overflow-hidden">
      {/* 3D 영역: flex-[1.8]으로 더 넓게 차지 */}
      <div className="flex-[1.8] min-w-0">
        {model && <Rendering3D modelName={model.name} />}
      </div>

      {/* 기계/부품 영역: flex-1 */}
      <div className="flex-1 min-w-0">
        <MachinePanel
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
        />
      </div>

      {/* 워크스페이스 영역: flex-1 */}
      <div className="flex-1 min-w-0">
        <WorkspacePanel />
      </div>
    </div>
  );
}
