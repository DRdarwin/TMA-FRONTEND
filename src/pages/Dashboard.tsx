// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet";

// Іконки (можна замінити на Lucide)
const MenuIcon = () => <span className="text-xl">☰</span>;

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar для мобільних */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed top-4 left-4 z-50 bg-opacity-30 md:hidden"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 bg-background shadow-lg md:static md:flex md:w-auto">
          <h2 className="text-xl font-semibold mb-4 md:hidden">Меню</h2>
          <nav className="flex flex-col gap-4 md:flex-row md:gap-6">
            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-muted flex items-center">
              🏠 <span className="ml-2">Головна</span>
            </Link>
            <Link to="/schedule" className="px-4 py-2 rounded-lg hover:bg-muted flex items-center">
              📅 <span className="ml-2">Розклад</span>
            </Link>
            <Link to="/finance" className="px-4 py-2 rounded-lg hover:bg-muted flex items-center">
              💰 <span className="ml-2">Фінанси</span>
            </Link>
            <Link to="/settings" className="px-4 py-2 rounded-lg hover:bg-muted flex items-center">
              ⚙️ <span className="ml-2">Налаштування</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Контентна область */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Заголовок */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center md:text-left">
          📊 Головна панель
        </h1>

        {/* Контейнер карток, адаптивний grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link to="/finance" className="hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>💰 Фінанси</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Перегляньте фінансові дані та історію транзакцій.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/schedule" className="hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>📅 Розклад</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Перегляньте графік польотів та завдань.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/settings" className="hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>⚙️ Налаштування</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Змініть налаштування свого акаунту та додатка.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
