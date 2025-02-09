// global.d.ts
export {}; // Це необхідно, щоб файл сприймався як модуль

// Глобальний опис користувача Telegram
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// Інтерфейс для Telegram WebApp, де є потрібні методи
interface TelegramWebApp {
  sendData(data: string): void;
  close(): void;
}

// Інтерфейс для Telegram, де WebApp може бути відсутнім
interface Telegram {
  WebApp?: TelegramWebApp;
}

// Розширення глобального об'єкта window
declare global {
  interface Window {
    Telegram?: Telegram;
    handleTelegramAuth?: (user: TelegramUser) => void;
  }
}
