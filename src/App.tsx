import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import LandingPage from "./pages/LandingPage";
import StudyPage from "./pages/StudyPage";
import AssetPage from "./pages/AssetPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <div className="h-full">
      <Routes>
        {/* 기본 */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<LandingPage />} />

        {/* 학습 */}
        <Route path="/study" element={<StudyPage />} />

        {/* 퀴즈 */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* 기타 */}
        <Route path="/asset" element={<AssetPage />} />
      </Routes>
    </div>
  );
}

export default App;
