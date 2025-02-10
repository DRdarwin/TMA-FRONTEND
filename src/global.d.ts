// global.d.ts
export {}; // Потрібно, щоб файл бачився як модуль

export interface TelegramUser {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

declare global {
  // Тип для Telegram WebApp (якщо ви працюєте з tg API через window.Telegram.WebApp)
  interface TelegramWebApp {
    sendData(data: string): void;
    close(): void;
    // За потреби додайте інші методи/поля (themeParams, expand(), MainButton, тощо)
  }

  // Розширюємо глобальний об’єкт window
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
    // Функція, яку викличе Telegram при успішному логіні
    handleTelegramAuth?: (user: TelegramUser) => void;
  }
}
