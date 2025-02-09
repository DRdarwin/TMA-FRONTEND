import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import TelegramAuth from "./pages/TelegramAuth";
import Header from "./components/navigation/Header";
import { THEME_LIGHT, THEME_DARK, themes } from "./config/theme";

// Обмежуємо тип теми
type ThemeType = "light" | "dark";

// Якщо тип TelegramUser вже визначено в global.d.ts або іншому місці, можна його використовувати
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const App: React.FC = () => {
  console.log("App component is rendering");

  const isAuthenticated = !!localStorage.getItem("telegramUser");

  const [theme, setTheme] = useState<ThemeType>(THEME_LIGHT);
  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
  };

  const containerStyle = {
    backgroundColor: themes[theme].background,
    color: themes[theme].color,
    minHeight: "100vh",
    transition: "background-color 0.3s, color 0.3s",
  };

  const navigate = useNavigate();

  // Використовуємо параметр із префіксом '_', бо він поки не використовується
  const handleAuthSuccess = (_user: TelegramUser) => {
    void _user; // Примусово "використовуємо" _user, щоб ESLint не скаржився
    navigate("/dashboard");
  };

  return (
    <div style={containerStyle} className="flex flex-col">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="flex items-center justify-center flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <TelegramAuth onAuthSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/schedule"
            element={
              isAuthenticated ? <Schedule /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/finance"
            element={
              isAuthenticated ? <Finance /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? <Settings /> : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
