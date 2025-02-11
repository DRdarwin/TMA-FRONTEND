import axios from 'axios';

interface AdminData {
  flights: Flight[];
  wallets: Wallet[];
  chartData: number[];
}

interface Flight {
  id: string;
  name: string;
  date: string;
}

interface Wallet {
  id: string;
  balance: number;
  currency: string;
}

export const getAdmin = async (): Promise<AdminData> => {
  try {
    const response = await axios.get('/api/admin');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных администратора:', error);
    throw error;
  }
};