import axios from 'axios';

interface FlightData {
  name: string;
  date: string;
}

export const createFlight = async (flightData: FlightData) => {
  try {
    const response = await axios.post('/api/flights', flightData);
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    throw error;
  }
};