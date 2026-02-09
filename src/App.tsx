import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "@/pages/LandingPage"; // 기존 랜딩 페이지
import StudyPage from "@/pages/StudyPage"; // StudyPage 임포트

function App() {
  return (
    <div className="h-full">
      <Routes>
        {/* / 경로로 들어와도 /home으로 보내기 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<LandingPage />} />
        
        {/* StudyPage 라우팅 추가 */}
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </div>
  );
}

export default App;