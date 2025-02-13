import axios from "axios";

const API_URL = "https://be.specialized-air.services"; // ⚡ Замінити на реальний бекенд URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// other exports
export const updateWallet = async (id: string, data: { balance: string }) => {
    try {
        const response = await api.put(`/wallet/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating wallet:", error);
        throw error;
    }
};

export const getFlights = async () => {
    // Implementation of getFlights
};

export const getWallets = async () => {
    // Implementation of getWallets
};
