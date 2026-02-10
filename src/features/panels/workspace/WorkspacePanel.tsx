import { useState } from "react";
import { PanelLayout } from "@/components/layout/PanelLayout";
import { TabSwitcher } from "@/components/ui/TabSwitcher";
import { NoteTab } from "./note/NoteTab";
import { AiChatTab } from "./AiChatTab";

// 부모에게서 modelId를 받기 위한 인터페이스 정의
interface WorkspacePanelProps {
  modelId: number;
  sessionId: number;
}

export function WorkspacePanel({sessionId}: WorkspacePanelProps) {
  // 탭 상태만 관리 (글쓰기 상태 같은 건 NoteTab으로 위임해서 코드가 깔끔해짐!)
  const [activeTab, setActiveTab] = useState<"LEFT" | "RIGHT">("LEFT");

  return (
    <PanelLayout
      header={
        <TabSwitcher
          leftLabel="노트"
          rightLabel="AI 어시스턴트"
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      }
    >
      {/* 탭에 따라 내용물(컴포넌트)만 교체 */}
      {activeTab === "LEFT" ? (
        <NoteTab sessionId={sessionId}/>
      ) : (
        // ID를 자식에게 전달
        <AiChatTab sessionId={sessionId}/>
      )}
    </PanelLayout>
  );
}