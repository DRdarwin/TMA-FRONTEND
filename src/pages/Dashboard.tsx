import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Notifications from "../components/Notifications";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// Визначаємо типи для користувача Telegram
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface TelegramInitDataUnsafe {
  user?: TelegramUser;
}

interface TelegramWebApp {
  initDataUnsafe: TelegramInitDataUnsafe;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const getTelegramFirstName = async (): Promise<string> => {
  try {
    const telegramWebApp = window.Telegram?.WebApp;
    if (telegramWebApp?.initDataUnsafe?.user) {
      return telegramWebApp.initDataUnsafe.user.first_name;
    }
    console.warn(
      "Telegram WebApp облікові дані не знайдені. Використовується значення за замовчуванням.",
    );
    return "Гість";
  } catch (error) {
    console.error("Помилка під час отримання даних Telegram WebApp:", error);
    return "Гість";
  }
};

const links = [
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
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [firstName, setFirstName] = useState("Гість");

  useEffect(() => {
    const fetchFirstName = async () => {
      const name = await getTelegramFirstName();
      setFirstName(name);
    };
    fetchFirstName();
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
    >
      <div className="flex">
        <Sidebar />
        <main className="p-4 flex-grow">
          <Notifications />
          <div className="text-center">
            <h1 className="text-3xl font-bold">Вітаємо, {firstName}!</h1>
            <p className="text-gray-500 mt-2">Виберіть розділ для перегляду</p>
            <Button onClick={() => setDarkMode(!darkMode)} className="mt-4">
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}{" "}
              Змінити тему
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {links.map(({ path, label, logMessage }) => (
              <motion.div key={path} whileHover={{ scale: 1.05 }}>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle>{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button asChild>
                      <Link to={path} onClick={() => console.log(logMessage)}>
                        {label}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
