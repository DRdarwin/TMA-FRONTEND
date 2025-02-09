import "./index.css"; // Підключення стилів

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

console.log("🟢 Ініціалізація React застосунку");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ Root element не знайдено, рендеринг неможливий");
  throw new Error("Root element is missing from the document");
}

try {
  console.log("✅ Root element знайдено, рендеримо застосунок");
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} catch (error) {
  console.error("❌ Помилка рендерингу застосунку:", error);
}
