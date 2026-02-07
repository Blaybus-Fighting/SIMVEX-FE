import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AUTH_EVENT_NAME } from "@/utils/authEvent";
import "./App.css";
import StudyPage from "@pages/StudyPage.tsx";
import LandingPage from "@/pages/LandingPage";

import { useAuth } from "@/features/auth/hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { initAuth } = useAuth(); // 2. 훅 꺼내기

  // 3. 앱 시작 시 로그인 확인 (initAuth 실행)
  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("세션 만료! 메인으로 이동");
      navigate("/home", { replace: true });
    };

    window.addEventListener(AUTH_EVENT_NAME, handleUnauthorized);
    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, handleUnauthorized);
    };
  }, [navigate]);

  return (
      <div className="h-full">
        <Routes>
          {/* / 경로로 들어와도 home으로 보내기 */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </div>
  );
}

export default App;