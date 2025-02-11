import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
    throw error;
  }
};