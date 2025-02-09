import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // URL бекенду

// Відправка повідомлення
export const sendNotification = async (userId: string, message: string) => {
  return axios.post(`${API_URL}/notifications/send`, { userId, message });
};

// Отримання повідомлень для користувача
export const getNotifications = async (userId: string) => {
  return axios.get(`${API_URL}/notifications/${userId}`);
};
