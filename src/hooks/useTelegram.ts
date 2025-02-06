import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk"; // ❌ БУЛО: { WebApp } ✅ СТАЛО: WebApp

export function useTelegram() {
    const [user, setUser] = useState(WebApp.initDataUnsafe?.user || null);

    useEffect(() => {
        console.log("📥 Ініціалізація хуку useTelegram");
        if (!WebApp.initDataUnsafe?.user) {
            console.warn("⚠️ Дані користувача не знайдені");
        } else {
            console.log("📦 Отримані дані користувача:", WebApp.initDataUnsafe.user);
            setUser(WebApp.initDataUnsafe.user);
        }
    }, []);

    return { user, WebApp };
}