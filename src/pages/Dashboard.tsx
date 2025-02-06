import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        console.warn("⚠️ Користувач не знайдений, використовується значення за замовчуванням");
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-bold">Вітаємо, Гість!</h1>
                <p className="text-gray-500 mt-2">Будь ласка, авторизуйтесь для доступу до системи.</p>
            </div>
        );
    }

    console.log("📌 Ініціалізація Dashboard.tsx");
    console.log("👤 Поточний користувач:", user);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold">Вітаємо, {user.firstName}!</h1>
            <p className="text-gray-500 mt-2">Виберіть розділ для перегляду</p>

            <div className="mt-6 flex flex-col gap-4">
                <Link to="/schedule" className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg shadow-md hover:bg-blue-600" onClick={() => console.log("📅 Перехід до Розкладу рейсів")}>
                    📅 Розклад рейсів
                </Link>
                <Link to="/finance" className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg shadow-md hover:bg-green-600" onClick={() => console.log("💰 Перехід до Фінансів")}>
                    💰 Фінанси
                </Link>
                <Link to="/settings" className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg shadow-md hover:bg-gray-600" onClick={() => console.log("⚙️ Перехід до Налаштувань")}>
                    ⚙️ Налаштування
                </Link>
            </div>
        </div>
    );
}