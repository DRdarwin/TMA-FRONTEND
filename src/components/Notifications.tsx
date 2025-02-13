import { useNotifications } from "../hooks/useNotifications";
import { useUser } from "../hooks/useUser";

const Notifications = () => {
  const { user } = useUser(); // Отримуємо інформацію про користувача
  const notifications: { id: string; message: string }[] = useNotifications(
    user?.id,
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Сповіщення</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Немає нових сповіщень</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b py-2">
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
