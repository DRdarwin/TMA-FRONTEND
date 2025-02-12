import axios from 'axios';

const API_URL = '/api/routes';

type Route = {
  id: string;
  name: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  waypoints: any;
};

export const fetchRoutes = async (): Promise<Route[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchRouteById = async (id: string): Promise<Route> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRoute = async (routeData: Omit<Route, 'id'>): Promise<Route> => {
  const response = await axios.post(API_URL, routeData);
  return response.data;
};

export const updateRoute = async (id: string, routeData: Partial<Omit<Route, 'id'>>): Promise<Route> => {
  const response = await axios.put(`${API_URL}/${id}`, routeData);
  return response.data;
};

export const deleteRoute = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
