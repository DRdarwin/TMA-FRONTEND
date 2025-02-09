import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const LANGUAGES = ["Українська", "English", "Русский"];

export default function Settings() {
  const [language, setLanguage] = useState("Українська");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || THEME_LIGHT,
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    console.log("Language change triggered: ", event.target.value);
    setLanguage(event.target.value);
  };

  const toggleTheme = () => {
    console.log("Theme toggle triggered. Current theme: ", theme);
    setTheme((prevTheme) =>
      prevTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
    );
  };

  const handleProfileSettings = () => {
    console.log("Navigating to profile settings...");
  };

  console.log(
    "Rendering Settings component with language:",
    language,
    "and theme:",
    theme,
  );

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-semibold">⚙️ Налаштування</h1>

      <div className="mt-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="language"
        >
          Виберіть мову
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border border-gray-300 rounded-md"
          aria-label="Select language"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-semibold mb-2">Тема</label>
        <Button onClick={toggleTheme} className="px-4 py-2">
          Змінити на {theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT} тему
        </Button>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Профіль
        </label>
        <Button onClick={handleProfileSettings} className="px-4 py-2">
          Налаштування профілю
        </Button>
      </div>
    </div>
  );
}
