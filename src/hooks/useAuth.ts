import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Кастомний хук для доступу до контексту авторизації
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("✅ Контекст авторизації:", useAuth());

  if (!context) {
    console.error("❌ useAuth викликано поза AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }

  console.log("✅ Використано useAuth", context);
  return context;
};
