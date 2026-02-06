import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AUTH_EVENT_NAME } from "@/utils/authEvent";
import "./App.css";
import Test from "@pages/TestPage";
import StudyPage from "@pages/StudyPage.tsx";
import LandingPage from "@/pages/LandingPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      console.log("세션 만료됨! 로그인 페이지로 이동 예정");
      navigate("/login", { replace: true });
    };

    window.addEventListener(AUTH_EVENT_NAME, handleUnauthorized);
    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, handleUnauthorized);
    };
  }, [navigate]);

  return (
    <div className="h-full">
      {/* <Header /> */}
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </div>
  );
}

export default App;
