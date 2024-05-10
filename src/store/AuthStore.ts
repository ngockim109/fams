/* eslint-disable import/prefer-default-export */
import { create } from "zustand";
import { AxiosError } from "axios";
import { ILogin } from "../interfaces/login.interface";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  postLogin,
  postLogout,
} from "../services/api/api-caller/AuthApiCaller";

interface IAuthStore {
  loading: boolean;
  postLogin: (data: ILogin[]) => Promise<void>;
  postLogout: (token: string) => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  loading: false,
  postLogin: async (data: ILogin[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      await postLogin({ data });
      successNotify("Login successfully!");
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          "Your Username or Password is incorrect!"
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  postLogout: async (token: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      await postLogout({ token });
      successNotify("Logout successfully!");
    } catch (err) {
      // Catch & log error
      console.log("API Error:", err);
      errorNotify("Failed to Logout. Please try again later");
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
