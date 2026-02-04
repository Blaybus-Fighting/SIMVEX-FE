import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/HomePage";
import { AUTH_EVENT_NAME } from "@/utils/authEvent";
import "./App.css";
import Test from "@pages/TestPage";

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
      <Routes>
        {/* 라우팅 설정을 위해 임시로 만들어놓은 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
