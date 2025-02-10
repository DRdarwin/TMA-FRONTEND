import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const LANGUAGES = ["Українська", "English", "Русский"];

export default function Settings() {
  const [language, setLanguage] = useState("Українська");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || THEME_LIGHT);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Language change triggered: ", event.target.value);
    setLanguage(event.target.value);
  };

  const toggleTheme = () => {
    console.log("Theme toggle triggered. Current theme: ", theme);
    setTheme((prevTheme) => (prevTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
  };

  const handleProfileSettings = () => {
    console.log("Navigating to profile settings...");
  };

  console.log("Rendering Settings component with language:", language, "and theme:", theme);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Налаштування</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Мова */}
        <Card>
          <CardHeader>
            <CardTitle>🌍 Вибір мови</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Select language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Тема */}
        <Card>
          <CardHeader>
            <CardTitle>🎨 Тема</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={toggleTheme} className="w-full">
              Змінити на {theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT} тему
            </Button>
          </CardContent>
        </Card>

        {/* Профіль */}
        <Card>
          <CardHeader>
            <CardTitle>👤 Профіль</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleProfileSettings} className="w-full">
              Налаштування профілю
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
