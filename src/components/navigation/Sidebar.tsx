import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-4 left-4 z-50 bg-opacity-30 md:hidden"
        >
          ☰ Меню
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 p-4 bg-background shadow-lg md:static md:flex md:w-auto"
      >
        <h2 className="text-xl font-semibold mb-4 md:hidden">Навігація</h2>
        <nav className="flex flex-col gap-4 md:flex-row md:gap-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-muted flex items-center"
          >
            🏠 <span className="ml-2">Головна</span>
          </Link>
          <Link
            to="/schedule"
            className="px-4 py-2 rounded-lg hover:bg-muted flex items-center"
          >
            📅 <span className="ml-2">Розклад</span>
          </Link>
          <Link
            to="/finance"
            className="px-4 py-2 rounded-lg hover:bg-muted flex items-center"
          >
            💰 <span className="ml-2">Фінанси</span>
          </Link>
          <Link
            to="/routes"
            className="px-4 py-2 rounded-lg hover:bg-muted flex items-center"
          >
            🛤️ <span className="ml-2">Маршрути</span>
          </Link>
          <Link
            to="/settings"
            className="px-4 py-2 rounded-lg hover:bg-muted flex items-center"
          >
            ⚙️ <span className="ml-2">Налаштування</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
