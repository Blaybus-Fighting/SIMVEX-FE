// src/pages/StudyPage.tsx
import { useEffect, useState } from "react";
import MachineInfoPanel from "@/features/machine/components/MachineInfoPanel";
import { WorkspacePanel } from "@/features/panels/workspace/WorkspacePanel";
import { useSearchParams } from "react-router-dom";
import { getDetailModel } from "@/api/modelApi";
import ApiLoadingBar from "@/components/common/ApiLoadingBar";
import { useDetailModelStore } from "@/store/modelStore";
import Rendering3D from "@/features/viewer/components/Rendering3D";

export default function StudyPage() {
  const { model, setModel } = useDetailModelStore();

  const [activeTab] = useState<"machine" | "part">("machine");
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
    <div className="workspace-layout">
      {model && <Rendering3D modelName={model.name} />}
      <div className="viewer-area" />
      <div className="machine-area">
        <MachineInfoPanel
          activeTab={activeTab}
          selectedPart={selectedPart}
          onPartSelect={setSelectedPart}
        />
      </div>
      <div className="ai-area">
        <WorkspacePanel />
      </div>
    </div>
  );
}
