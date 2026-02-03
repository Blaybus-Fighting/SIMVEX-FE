import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        {/* 라우팅 설정을 위해 임시로 만들어놓은 페이지 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
