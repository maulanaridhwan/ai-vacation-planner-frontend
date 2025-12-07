import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planVacation = async (vacationData) => {
  try {
    const response = await apiClient.post('/plan-vacation', vacationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to plan vacation' };
  }
};

export default apiClient;
