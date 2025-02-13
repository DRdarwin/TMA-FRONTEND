import axios from 'axios';

const API_URL = '/api/routes';

export const fetchRoutes = async () => {
  // Mock implementation or actual API call
  return [
    { id: 1, name: 'Route 1', waypoints: [{ latitude: 48.3794, longitude: 31.1656 }] },
    { id: 2, name: 'Route 2', waypoints: [{ latitude: 48.3794, longitude: 31.1656 }] }
  ];
};

export const fetchRouteById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRoute = async (route: { name: string; description?: string; waypoints: { latitude: number; longitude: number }[] }) => {
  // Mock implementation of API call
  return new Promise<{ id: string; name: string; description?: string; waypoints: { latitude: number; longitude: number }[] }>((resolve) => {
    setTimeout(() => {
      resolve({ id: '1', name: route.name, description: route.description, waypoints: route.waypoints });
    }, 1000);
  });
};

export const updateRoute = async (id: string, routeData: { name: string; path: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, routeData);
  return response.data;
};

export const deleteRoute = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
