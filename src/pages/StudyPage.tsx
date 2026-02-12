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
import { getSession, putSession } from "@/api/sessionApi";
import type { ViewData } from "@/types/session";
import { useViewDataStore } from "@/store/sessionStore";

export default function StudyPage() {
  const navigate = useNavigate();
  const { model, setModel } = useDetailModelStore(); // 실제 모델 데이터
  const clearPartList = usePartListStore((state) => state.clear);
  const clearPart = usePartStore((state) => state.clear);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const modelId = Number(searchParams.get("modelId"));

  // 페이지 나갈 때 parts와 part 초기화
  useEffect(() => {
    return () => {
      clearPartList();
      clearPart();
    };
  }, [clearPartList, clearPart]);

  // zustand 상태 저장
  const { setViewData } = useViewDataStore();

  useEffect(() => {
    const fetchDetailModel = async () => {
      try {
        // 1) 모델 객체 상세 조회
        const modelRes = await getDetailModel(modelId);

        if (!modelRes.isSuccess) {
          console.log("모델 객체 상세 조회 실패: ", modelRes.error);
          return;
        }

        setModel(modelRes.data); // 해당 모델 저장
        const modelPK = modelRes.data.id; // setModels 직후에 쓰지 말고 응답값에 있는 id값을 사용
        const sessionPK = modelRes.data.sessionId; // 세션 아이디(세션 업데이트 API에 사용)
        console.log("세션 아이디: ", sessionPK);

        // 2) 세션 조회
        const sessionRes = await getSession(modelPK);

        // 3) 세션 없거나 viewData가 비어있는 경우 → 초기 세션 생성
        if (
          !sessionRes.data.viewData ||
          sessionRes.data.viewData.trim() === ""
        ) {
          console.log("세션 없음 -> 초기 viewData 생성");

          // 진입 즉시용 ViewData(처음 들어왔을 때는 Canvas가 아직 안 뜬 상태일 수 있기 때문)
          const initialViewData: ViewData = {
            camera: {
              position: { x: 2.2, y: 2.2, z: 1.2 },
              target: { x: -0.68, y: 0.03, z: 0.0 },
              up: { x: 0, y: 1, z: 0 },
              fov: 45,
            },
            viewport: {
              zoom: 1.0,
              pan: { x: 0, y: 0 },
              rotation: { x: 0, y: 0, z: 0 },
            },
            explode: 0, // 조립 상태
            selection: {
              selectedObjectIds: [],
            },
            meta: {
              savedAt: new Date().toISOString(),
              clientVersion: "web-1.3.2",
            },
          };

          const putRes = await putSession(modelPK, sessionPK, initialViewData); // 세션 생성 및 저장 API 요청

          if (putRes.isSuccess) {
            console.log("세선 업데이트 성공: ", putRes.data);
          } else {
            console.log("세선 업데이트 실패: ", putRes.error);
          }

          // 초기 viewData도 state에 주입
          setViewData(initialViewData);
          return;
        }

        // 4) 세션이 존재하는 경우 -> viewData 복원
        const parsedViewData = JSON.parse(sessionRes.data.viewData) as ViewData;

        console.log("세션 로드 성공:", parsedViewData);

        // 5) 세션에 viewData가 있으면 파싱해서 state에 주입
        setViewData(parsedViewData);
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
            <ArrowBack className="w-5 h-5 fill-white" />
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
          <UserMenu />
        </div>
      </HeaderFrame>

      {/* 2. 작업 영역 (3D + 패널) */}
      {/* 부모 flex-1로 변경하여 남은 공간 채움 */}
      <div className="flex flex-1 py-2 gap-2 overflow-hidden">
        {/* 3D 뷰어 영역: 1.5 비율 (flex-[1.5]) */}
        <div className="flex-[1.5] min-w-0 relative bg-background-300 overflow-hidden pb-2">
          {model && <Rendering3D modelName={model.name} />}
        </div>

        {/* 기계/부품 패널: 1 비율 */}
        <div className="flex-1 min-w-0">
          <MachinePanel
          // onPartSelect={setSelectedPart}
          />
        </div>

        {/* 노트/AI 패널: 1 비율 */}
        <div className="flex-1 min-w-0">
          {model && <WorkspacePanel modelId={model.id} />}
        </div>
      </div>
    </div>
  );
}
