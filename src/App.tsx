import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthProvider"; // Зміна шляху

export default function App() {
  return (
    <AuthProvider>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
