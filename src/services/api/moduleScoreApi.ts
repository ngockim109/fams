// This function is handle get, post, put, del Mock API for students and scores
import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL_MODULE_SCORE } from "../../constants/Api";

const api = axios.create({
  baseURL: BASE_URL_MODULE_SCORE,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error: AxiosError) => {
  console.error("Mock API request error:", error);
  throw error;
};

export const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.get<T>(url);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error);
    }
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data: unknown
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.post<T>(url, data);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error);
    }
    throw error;
  }
};

export const put = async <T>(
  url: string,
  data: unknown
): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.put<T>(url, data);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error);
    }
    throw error;
  }
};

export const del = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await api.delete<T>(url);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error);
    }
    throw error;
  }
};
