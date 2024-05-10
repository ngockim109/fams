// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import { IUser } from "../interfaces/user.interface";
import {
  deleteSingleUser,
  getUsers,
  postUser,
  getUsersById,
  postSingleUser,
  patchSingleUser,
} from "../services/api/api-caller/UserApiCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

interface IUserStore {
  user: IUser[] | null;
  loading: boolean;
  fetchUser: (searchTerm?: string, searchSignal?: AbortSignal) => void;
  postUser: (data: IUser[]) => Promise<void>;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: [],
  loading: false,
  fetchUser: async (searchTerm?: string, searchSignal?: AbortSignal) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getUsers(searchTerm, searchSignal);
      set((state) => ({ ...state, user: data }));
    } catch (error) {
      set((state) => ({ ...state, user: [] }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  postUser: async (data: IUser[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      await postUser({ data });
      successNotify(
        generateSuccessMessage("has been created", "User information")
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("add", "the user")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

interface ISingleUserStore {
  aUser: IUser | null;
  loading: boolean;
  users: IUser[];
  getUserByID: (id: string) => void;
  postSingleUser: (data: IUser) => Promise<void>;
  putSingleUser: (
    data: { path: string; value: string | boolean; op: string }[],
    id: string
  ) => Promise<void>;
  deleteSingleUser: (id: string) => Promise<void>;
}
export const useSingleUserStore = create<ISingleUserStore>((set) => ({
  aUser: null,
  loading: false,
  users: [],
  getUserByID: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getUsersById({ id });
      const validData: IUser | null = Array.isArray(data) ? data[0] : data;
      set((state) => ({
        ...state,
        aUser: validData,
        users: [...state.users, ...(Array.isArray(data) ? data : [data])],
      }));
    } catch (error) {
      console.error("API Error: ", error);
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  postSingleUser: async (data: IUser) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postSingleUser({ data });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been saved", "User information")
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("create", "the user")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  putSingleUser: async (
    data: { path: string; value: string | boolean; op: string }[],
    id: string
  ) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await patchSingleUser({ data, id });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been changed", "User information")
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("edit", "the user")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  deleteSingleUser: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await deleteSingleUser({ id });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("deleted", "User was")
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("delete", "the user")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
