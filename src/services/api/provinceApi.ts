// This function is handle get, post, put, del Mock API for students and scores
import axios, { AxiosError, AxiosResponse } from "axios";
import { PROVINCE_URL } from "../../constants/Api";

const provinceApi = axios.create({
  baseURL: PROVINCE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error: AxiosError) => {
  console.error("Mock API request error:", error);
  throw error;
};

const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await provinceApi.get<T>(url);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleApiError(error);
    }
    throw error;
  }
};

export default get;
