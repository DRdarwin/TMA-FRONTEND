import React, { useEffect } from "react";
import { TelegramUser } from "../global";

// Пропси вашого компонента
interface TelegramAuthProps {
  onAuthSuccess: (user: TelegramUser) => void; 
  // TelegramUser уже оголошений глобально, 
  // тож ми його тут можемо просто використовувати
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ onAuthSuccess }) => {
  // Приклад URL (замість хардкоду краще використати .env, але це ваш вибір)
  const BASE_URL = "https://be.specialized-air.services";
  const redirectURL = "/dashboard";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Знаходимо блок, куди вставиться скрипт Telegram
    const telegramLoginElement = document.getElementById("telegram-login");

    // Перевіряємо, чи не завантажений скрипт раніше
    const existingScript = document.querySelector(
      "script[src='https://telegram.org/js/telegram-widget.js?22']"
    );

    // Якщо кнопка Telegram ще не вставлялася — додаємо <script>
    if (
      telegramLoginElement &&
      !telegramLoginElement.hasChildNodes() &&
      !existingScript
    ) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "chernyshy_bot"); // ваш бот
      script.setAttribute("data-size", "medium");
      script.setAttribute("data-radius", "14");
      // Адреса, куди телеграм буде редіректити користувача після успішної авторизації
      script.setAttribute("data-auth-url", `${BASE_URL}${redirectURL}`);
      script.setAttribute("data-request-access", "write");
      // Можна handleTelegramAuth або handleTelegramAuth(user)
      script.setAttribute("data-onauth", "handleTelegramAuth(user)");

      telegramLoginElement.appendChild(script);
    }

    // Оголошуємо глобальну функцію, яку скрипт викличе після успішної авторизації
    window.handleTelegramAuth = (user: TelegramUser) => {
      console.log("✅ Успішна авторизація Telegram:", user);

      // Зберігаємо дані користувача у LocalStorage (за бажанням)
      localStorage.setItem("telegramUser", JSON.stringify(user));

      // Якщо ми у Telegram WebApp
      if (window.Telegram?.WebApp) {
        // const webApp = window.Telegram.WebApp;
        // Надсилаємо дані і закриваємо WebApp
        // webApp.sendData(JSON.stringify(user)); // This method does not exist on TelegramWebApp
        // webApp.close(); // This method does not exist on TelegramWebApp
      } else {
        // Інакше просто викликаємо колбек батьківського компонента
        onAuthSuccess(user);
      }
    };

    // Очищення: якщо ваш компонентUnmount вимагає зняття handleTelegramAuth, 
    // можете додати return () => { window.handleTelegramAuth = undefined; }  
    // Але це не завжди потрібно.

  }, [onAuthSuccess, redirectURL]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <h2 className="text-xl font-semibold mb-4">Авторизація через Telegram</h2>
        {/* Елемент, куди Telegram вставить кнопку */}
        <div id="telegram-login"></div>
      </div>
    </div>
  );
};

export default TelegramAuth;
