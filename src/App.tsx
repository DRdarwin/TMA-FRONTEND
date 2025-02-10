import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Disqualification from "./pages/Disqualifications";
import TelegramAuth from "./pages/TelegramAuth";
import Header from "./components/navigation/Header";
import Sidebar from "./components/navigation/Sidebar";
import { TelegramUser } from "./global";

const handleAuthSuccess = (user: TelegramUser) => {
  console.log("✅ Авторизація успішна!", user);
};

// Головний макет (Sidebar + Header + Контент)
const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Основний контент */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <Header theme="light" toggleTheme={() => console.log("Тема змінена")} />

        {/* Динамічний контент, що змінюється в залежності від маршруту */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// `App.tsx` без <BrowserRouter>
function App() {
  return (
    <Routes>
      {/* Використання MainLayout для основних сторінок */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/disqualification" element={<Disqualification />} />
      </Route>

      {/* TelegramAuth без Sidebar */}
      <Route path="/auth" element={<TelegramAuth onAuthSuccess={handleAuthSuccess} />} />
    </Routes>
  );
}

export default App;
