import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// 1) 가장 먼저 ticket 선점
const params = new URLSearchParams(window.location.search);
const ticket = params.get("ticket");
if (ticket) {
  sessionStorage.setItem("oauth_ticket", ticket);
  console.log("ticket: ", ticket);

  // 2) URL에서 ticket 제거
  window.history.replaceState({}, document.title, window.location.pathname);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
