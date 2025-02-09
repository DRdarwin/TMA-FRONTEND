import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { THEME_LIGHT } from "../../config/theme";

/**
 * Props for the Header component.
 * @property theme - The current theme of the application ('light' or 'dark').
 * @property toggleTheme - Function to toggle between light and dark themes.
 */
interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header = memo(({ theme, toggleTheme }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md border-b border-border">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate(-1)}
          title="Назад"
          aria-label="Назад"
          className="px-2 py-1"
        >
          ←
        </Button>
        <h1 className="text-xl font-bold tracking-wide">Pilot's Helper</h1>
      </div>
      <Button
        onClick={toggleTheme}
        title="Перемкнути тему"
        aria-label="Перемкнути тему"
      >
        {theme === THEME_LIGHT ? "🌙 Темна тема" : "☀️ Світла тема"}
      </Button>
    </header>
  );
});

export default Header;
