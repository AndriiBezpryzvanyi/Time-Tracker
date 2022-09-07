import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const GET = async (url: string, params?: AxiosRequestConfig) => {
  const res = await axiosInstance.get(url, { params });
  return { res };
};

const POST = async (url: string, data: any) => {
  const res = await axiosInstance.post(url, data);
  return { res };
};

const PATCH = async (url: string, data: any, params: AxiosRequestConfig) => {
  const res = await axiosInstance.patch(url, data, { params });
  return { res };
};

const DELETE = async (url: string, params: AxiosRequestConfig) => {
  const res = await axiosInstance.delete(url, { params });
  return { res };
};

export { GET, POST, PATCH, DELETE };
