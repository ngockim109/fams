// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import { IEmail } from "../interfaces/email.interface";
import {
  getEmails,
  postEmail,
  getEmailByID,
  postSingleEmail,
  putSingleEmail,
  getEmailByTypeName,
  patchSingleEmail,
} from "../services/api/api-caller/EmailApiCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

// EMAIL STORE
interface IEmailStore {
  email: IEmail[] | null;
  loading: boolean;
  getEmail: (searchTerm?: string, searchSignal?: AbortSignal) => void;
  getEmailByType: (type: string, applyTo: string) => Promise<void>;
  postEmail: (data: IEmail[]) => Promise<void>;
}

export const useEmailStore = create<IEmailStore>((set) => ({
  email: [],
  loading: false,
  getEmail: async (searchTerm?: string, searchSignal?: AbortSignal) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getEmails(searchTerm, searchSignal);
      set((state) => ({ ...state, email: data }));
    } catch (error) {
      // Catch & log error
      set((state) => ({ ...state, email: [] }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  getEmailByType: async (type: string, applyTo: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getEmailByTypeName({ type, applyTo });
      set((state) => ({ ...state, email: data }));
    } catch (error) {
      // Catch & log error
      set((state) => ({ ...state, email: [] }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  postEmail: async (data: IEmail[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postEmail({ data });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been created",
              "Email template information"
            )
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("post", "the email")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

// EMAIL SINGLE STORE
interface ISingleEmailStore {
  aEmail: IEmail | null;
  loading: boolean;
  getEmailByID: (id: string) => void;
  postSingleEmail: (data: IEmail) => Promise<void>;
  putSingleEmail: (data: IEmail, id: string) => Promise<void>;
  deleteSingleEmail: (id: string) => Promise<void>;
}
export const useSingleEmailStore = create<ISingleEmailStore>((set) => ({
  aEmail: null,
  loading: false,
  getEmailByID: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getEmailByID({ id });
      const validData: IEmail | null = Array.isArray(data) ? data[0] : data;
      set((state) => ({ ...state, aEmail: validData }));
    } catch (error) {
      console.error("API Error: ", error);
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  postSingleEmail: async (data: IEmail) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postSingleEmail({ data });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been created",
              "Email template information"
            )
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("create", "a new email template")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  putSingleEmail: async (data: IEmail, id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await putSingleEmail({ data, id });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been changed",
              "Email template information"
            )
      );
    } catch (error) {
      // Catch & log error
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("edit", "the email template")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  deleteSingleEmail: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await patchSingleEmail({ id });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage("deleted", "The email template was")
      );
    } catch (error) {
      // Catch & log error
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("delete", "the email template")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
