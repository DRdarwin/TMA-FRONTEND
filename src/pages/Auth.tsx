import { useTelegram } from "../hooks/useTelegram";
import { useState, useEffect, useCallback } from "react";
import { api } from "../api/api";
import { useAuth } from "../hooks/useAuth";

export default function Auth() {
    const { user, WebApp } = useTelegram();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    console.log("📥 Ініціалізація компонента Auth", { user });

    // Використовуємо useCallback, щоб уникнути зайвих викликів
    const handleLogin = useCallback((userData: typeof user) => {
        if (!userData || !userData.id) return;

        login({
            id: userData.id.toString(),
            firstName: userData.first_name || "Гість",
            lastName: userData.last_name || "",
            username: userData.username || "",
            photoUrl: userData.photo_url || "",
        });
    }, [login]);

    // Використовуємо useEffect лише якщо користувач змінився
    useEffect(() => {
        if (user && user.id) {
            console.log("🔄 Авторизація користувача", user);
            handleLogin(user);
        }
    }, [user, handleLogin]);

    const handleAuth = async () => {
        if (!user) {
            console.warn("⚠️ Користувач не знайдений");
            return;
        }

        console.log("▶️ Початок авторизації", user);
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post("/auth", user);
            console.log("✅ Авторизація успішна:", response.data);
            login(response.data);
            WebApp?.close();
        } catch (err) {
            console.error("❌ Помилка авторизації:", err);
            setError("Не вдалося авторизувати користувача. Спробуйте ще раз.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {user ? (
                <div className="text-center">
                    <img
                        src={user.photo_url || "https://via.placeholder.com/150"}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h1 className="text-2xl font-semibold">{user.first_name} {user.last_name}</h1>
                    <p className="text-gray-500">@{user.username}</p>
                    <button
                        onClick={handleAuth}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Авторизація..." : "Авторизуватись"}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            ) : (
                <p className="text-lg font-semibold">Завантаження даних...</p>
            )}
        </div>
    );
}
