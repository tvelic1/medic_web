import axios, { AxiosRequestConfig, Method } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true, 
  
});

interface RequestOptions {
  method: Method;
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
}

export const makeRequest = async ({ method, endpoint, data, headers }: RequestOptions) => {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      method: method,
      data: data,
      headers: headers,
    };

    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response);
      throw new Error(error.response?.data?.message || 'Failed to make request');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
};
