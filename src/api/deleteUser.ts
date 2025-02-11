import axios from 'axios';

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`/api/users/${userId}`);
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};