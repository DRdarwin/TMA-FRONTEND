import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import { Button } from "../components/ui/button";

// Визначаємо типи для користувача Telegram
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  // Додаткові властивості можна додати при потребі
}

// Визначаємо тип для небезпечних даних ініціалізації
interface TelegramInitDataUnsafe {
  user?: TelegramUser;
  // Додаткові властивості можна додати при потребі
}

// Визначаємо тип для Telegram WebApp
interface TelegramWebApp {
  initDataUnsafe: TelegramInitDataUnsafe;
  // Додаткові властивості можна додати при потребі
}

// Декларуємо глобальне розширення для об'єкта window
declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

// Функція для отримання імені користувача з Telegram WebApp
const getTelegramFirstName = (): string => {
  const telegramWebApp = window.Telegram?.WebApp;
  if (telegramWebApp?.initDataUnsafe?.user) {
    return telegramWebApp.initDataUnsafe.user.first_name;
  }
  console.warn(
    "Telegram WebApp облікові дані не знайдені. Використовуємо значення за замовчуванням.",
  );
  return "Гість";
};

// Компонент для привітання користувача
const UserGreeting: React.FC<{ firstName: string }> = ({ firstName }) => {
  console.log("📝 Rendering UserGreeting component for:", firstName);
  return <h1 className="text-3xl font-bold">Вітаємо, {firstName}!</h1>;
};

// Компонент для відображення навігаційних посилань
const NavigationLinks: React.FC<{
  links: { path: string; label: string; logMessage: string }[];
}> = ({ links }) => {
  console.log("🔗 Rendering NavigationLinks component");
  return (
    <div className="mt-6 flex flex-col gap-4">
      {links.map(({ path, label, logMessage }) => (
        <Button asChild key={path}>
          <Link to={path} onClick={() => console.log(logMessage)}>
            {label}
          </Link>
        </Button>
      ))}
    </div>
  );
};

// Основний контент для Dashboard, включаючи привітання та навігаційні посилання
const DashboardContent: React.FC<{
  firstName: string;
  links: { path: string; label: string; logMessage: string }[];
}> = ({ firstName, links }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <UserGreeting firstName={firstName} />
      <p className="text-gray-500 mt-2">Виберіть розділ для перегляду</p>
      <NavigationLinks links={links} />
    </div>
  );
};

// Головний компонент Dashboard
export default function Dashboard() {
  console.log("📌 Rendering Dashboard component");

  // Стан для імені користувача, за замовчуванням "Гість"
  const [firstName, setFirstName] = useState("Гість");

  // Отримуємо ім'я користувача після монтування компонента
  useEffect(() => {
    const telegramName = getTelegramFirstName();
    setFirstName(telegramName);
  }, []);

  // Набір навігаційних посилань
  const links = useMemo(
    () => [
      {
        path: "/schedule",
        label: "📅 Розклад рейсів",
        logMessage: "📅 Перехід до Розкладу рейсів",
      },
      {
        path: "/finance",
        label: "💰 Фінанси",
        logMessage: "💰 Перехід до Фінансів",
      },
      {
        path: "/settings",
        label: "⚙️ Налаштування",
        logMessage: "⚙️ Перехід до Налаштувань",
      },
    ],
    [],
  );

  // Стан для теми
  const [theme, setTheme] = useState("light");

  // Функція для перемикання теми
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Вставляємо Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="flex">
        {/* Вставляємо Sidebar */}
        <Sidebar />
        <main className="p-4 flex-grow">
          <DashboardContent firstName={firstName} links={links} />
        </main>
      </div>
    </div>
  );
}
