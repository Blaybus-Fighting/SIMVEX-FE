// src/pages/StudyPage.tsx
import { useEffect, useState } from "react";
import MachinePanel from "@/features/machine/MachinePanel.tsx";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import { useSearchParams } from "react-router-dom";
import { getDetailModel } from "@/api/modelApi";
import ApiLoadingBar from "@/components/common/ApiLoadingBar";
import { useDetailModelStore } from "@/store/modelStore";
import Rendering3D from "@/features/viewer/components/Rendering3D";

export default function StudyPage() {
  const { model, setModel } = useDetailModelStore();

  const [loading, setLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const [searchParams] = useSearchParams(); // query string 방식: 새로고침 후에도 값 유지됨

  const modelId = Number(searchParams.get("modelId")); // modelId 가져오기

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
    <div className="flex w-full h-screen bg-[#0f172a] p-4 gap-4 overflow-hidden">
      {model && <Rendering3D modelName={model.name} />}

      {/* 3D 영역: flex-[1.8]으로 더 넓게 차지 */}
      <div className="flex-[1.8] min-w-0 bg-slate-900/50 rounded-xl border border-white/5" />

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
