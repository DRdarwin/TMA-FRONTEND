import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Disqualification from "./pages/Disqualifications";
import TelegramAuth from "./pages/TelegramAuth";
import Header from "./components/navigation/Header";
import { TelegramUser } from "./global"; // Імпорт глобального типу, де оголошено TelegramUser

// Прибираємо (або закоментовуємо) інтерфейс UserData,
// оскільки вирішили працювати лише з TelegramUser.
// interface UserData {
//   id: string;
//   name: string;
//   // ...
// }

const handleAuthSuccess = (user: TelegramUser) => {
  console.log("✅ Авторизація успішна!", user);
};

function AppRoutes() {
  return (
    <>
      <Header
        theme={""}
        toggleTheme={() => {
          throw new Error("Function not implemented.");
        }}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/disqualification" element={<Disqualification />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/settings" element={<Settings />} />
        {/* Передаємо саме TelegramUser у onAuthSuccess */}
        <Route path="/auth" element={<TelegramAuth onAuthSuccess={handleAuthSuccess} />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
