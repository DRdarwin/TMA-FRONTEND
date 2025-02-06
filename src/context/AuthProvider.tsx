import { ReactNode, useMemo, useState } from "react";
import { AuthContext, UserType } from "./AuthContext"; // Переконайтесь, що ці експорти існують у AuthContext

// Значення користувача за замовчуванням
const defaultUser: UserType = {
    id: "",
    firstName: "Guest",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType>(defaultUser);

    console.log("🔄 Поточний стан користувача:", user);

    const login = (userData: UserType) => {
        console.log("🔑 Авторизація запущена...", userData);
        setUser(userData);
    };

    // Оптимізація значення контексту через useMemo
    const authValue = useMemo(() => {
        console.log("🛠️ Оновлення значення контексту авторизації", { user });
        return { user, login };
    }, [user]);

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};
