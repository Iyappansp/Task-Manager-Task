import axiosClient from './axiosClient';

const authApi = {
  login: async (email, password) => {
    const response = await axiosClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await axiosClient.post('/auth/register', { name, email, password });
    return response.data;
  },
};

export default authApi;
