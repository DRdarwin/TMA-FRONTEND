import { useEffect } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramWebApp {
  sendData: (data: string) => void;
  close: () => void;
}

declare global {
  interface Window {
    handleTelegramAuth?: (user: TelegramUser) => void;
  }
}

interface TelegramAuthProps {
  onAuthSuccess: (user: TelegramUser) => void;
}

const TelegramAuth: React.FC<TelegramAuthProps> = ({ onAuthSuccess }) => {
  const redirectURL = "/dashboard";

  useEffect(() => {
    const telegramLoginElement = document.getElementById("telegram-login");
    if (
      telegramLoginElement &&
      !telegramLoginElement.hasChildNodes() &&
      !document.querySelector(
        "script[src='https://telegram.org/js/telegram-widget.js?22']",
      )
    ) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "chernyshy_bot");
      script.setAttribute("data-size", "medium");
      script.setAttribute("data-radius", "14");
      script.setAttribute(
        "data-auth-url",
        `https://be.specialized-air.services${redirectURL}`,
      );
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "handleTelegramAuth(user)");
      telegramLoginElement.appendChild(script);
    }

    window.handleTelegramAuth = (user: TelegramUser) => {
      console.log("✅ Успішна авторизація:", user);
      localStorage.setItem("telegramUser", JSON.stringify(user));

      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp as unknown as TelegramWebApp;
        webApp.sendData(JSON.stringify(user));
        webApp.close();
      } else {
        onAuthSuccess(user);
      }
    };
  }, [onAuthSuccess, redirectURL]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Авторизація через Telegram
        </h2>
        <div id="telegram-login"></div>
      </div>
    </div>
  );
};

export default TelegramAuth;
