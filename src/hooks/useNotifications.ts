import { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const { data } = await getNotifications(userId);
        setNotifications(data.data);
      } catch (error) {
        console.error("Помилка завантаження повідомлень:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return notifications;
};
