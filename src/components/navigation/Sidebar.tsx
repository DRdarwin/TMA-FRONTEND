import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed top-4 left-4 z-50">
          ☰ Меню
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4 bg-background">
        <h2 className="text-xl font-semibold mb-4">Навігація</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="px-4 py-2 rounded-lg hover:bg-muted">
            🏠 Головна
          </Link>
          <Link to="/schedule" className="px-4 py-2 rounded-lg hover:bg-muted">
            📅 Розклад
          </Link>
          <Link to="/finance" className="px-4 py-2 rounded-lg hover:bg-muted">
            💰 Фінанси
          </Link>
          <Link to="/settings" className="px-4 py-2 rounded-lg hover:bg-muted">
            ⚙️ Налаштування
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
