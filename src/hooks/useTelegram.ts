import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

interface UserType {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export function useTelegram() {
  console.log("🔧 Виконання useTelegram хука");

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    console.log("📥 Ініціалізація хуку useTelegram");

    const telegramUser = WebApp.initDataUnsafe?.user || null;
    console.log("🔍 Отримання даних користувача з Telegram:", telegramUser);
    setUser(telegramUser);

    if (!telegramUser) {
      console.warn("⚠️ Дані користувача не знайдені");
    } else {
      console.log("📦 Отримані дані користувача:", telegramUser);
    }

    const handleThemeChange = () => {
      console.log("🎨 Тема змінилася, можливе оновлення стилів.");
    };

    console.log("🎧 Підписка на зміну теми");
    WebApp.onEvent("themeChanged", handleThemeChange);

    return () => {
      console.log("🔕 Відписка від змін теми");
      WebApp.offEvent("themeChanged", handleThemeChange);
    };
  }, []);

  console.log("📤 Повернення даних з useTelegram:", { user, WebApp });
  return { user, WebApp };
}
