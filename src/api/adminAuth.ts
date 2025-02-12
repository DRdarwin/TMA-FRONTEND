// src/api/adminAuth.ts

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAdminAuth = async (): Promise<boolean> => {
    try {
        const response = await axios.get(`${API_URL}/admin/auth`, { withCredentials: true });
        return response.data.isAuthenticated;
    } catch (error) {
        console.error('Помилка перевірки авторизації адміністратора:', error);
        return false;
    }
};
