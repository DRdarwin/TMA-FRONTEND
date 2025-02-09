import { useState, useEffect } from "react";
import { Button } from "./button";
import Sidebar from "../navigation/Sidebar";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

function Header({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Telegram Mini App</h1>
      <Button onClick={toggleTheme}>
        {theme === THEME_LIGHT ? "🌙 Темна тема" : "☀️ Світла тема"}
      </Button>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || THEME_LIGHT;
    } catch (error) {
      console.error("Error accessing localStorage: ", error);
      return THEME_LIGHT;
    }
  });

  useEffect(() => {
    try {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error updating localStorage: ", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
    );
  };

  const [isSidebarLoading, setSidebarLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or initialization for Sidebar
    const timer = setTimeout(() => setSidebarLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="flex">
        {isSidebarLoading ? (
          <div className="p-4 text-center">Завантаження меню...</div>
        ) : (
          <Sidebar />
        )}
        <main className="p-4 flex-grow">{children}</main>
      </div>
    </div>
  );
}
