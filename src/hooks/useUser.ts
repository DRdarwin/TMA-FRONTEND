import { useState, useEffect } from "react";
import axios from "axios";

// Тип для користувача
interface User {
  id: string;
  name: string;
}

// Функція отримання користувача через API
export const useUser = () => {
  const [user, setUser] = useState<User>({ id: "", name: "Гість" });

  useEffect(() => {
    if (user.id) return; // Перевіряємо, чи користувач вже завантажений

    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user"); // Замініть на правильний API-запит
        setUser(response.data);
      } catch (error) {
        console.error("Помилка отримання користувача:", error);
      }
    };

    fetchUser();
  }, [user.id]);

  // Функція для оновлення користувача вручну
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return { user, updateUser };
};
