import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import StudyPage from "@pages/StudyPage.tsx";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <div className="h-full">
      <Routes>
        {/* / 경로로 들어와도 home으로 보내기 */}
        <Route path="/" element={<Navigate to="/home" replace/>}/>
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/study" element={<StudyPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
