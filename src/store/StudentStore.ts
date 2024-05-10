// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value
import { create } from "zustand";
import { AxiosError } from "axios";
import { IStudent } from "../interfaces/student.interface";
import {
  deleteSingleStudent,
  getStudentByID,
  getStudents,
  postSingleStudent,
  postStudent,
  putSingleStudent,
} from "../services/api/api-caller/StudentApiCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

// STUDENT STORE
interface IStudentStore {
  student: IStudent[] | null;
  loading: boolean;
  fetchStudent: (searchTerm?: string, searchSignal?: AbortSignal) => void;
  postStudent: (data: IStudent[]) => Promise<void>;
}

export const useStudentStore = create<IStudentStore>((set) => ({
  student: [],
  loading: false,
  fetchStudent: async (searchTerm?: string, searchSignal?: AbortSignal) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getStudents(searchTerm ?? "", searchSignal);
      // Update student when fetch successfully
      set((state) => ({ ...state, student: data }));
    } catch (err) {
      // If fetch failed, update student empty array
      set((state) => ({ ...state, student: [] }));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  postStudent: async (data: IStudent[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudent({ data });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been created", "Student information")
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("create", "new student")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

// SINGLE STUDENT STORE
interface ISingleStudentStore {
  aStudent: IStudent | null;
  newStudent: IStudent | null;
  loading: boolean;
  getStudentByID: (id: string) => void;
  postSingleStudent: (data: IStudent) => Promise<void>;
  putSingleStudent: (data: IStudent, id: string) => Promise<void>;
  deleteSingleStudent: (id: string) => Promise<void>;
}

export const useSingleStudentStore = create<ISingleStudentStore>((set) => ({
  aStudent: null,
  newStudent: null,
  loading: false,
  getStudentByID: async (id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      if (id !== "") {
        const data = await getStudentByID({ id });
        const validData: IStudent | null = Array.isArray(data) ? data[0] : data;
        // Update scores of student when fetch successfully
        set((state) => ({ ...state, aStudent: validData }));
      }
    } catch (err: unknown) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("get", "the student")
      );
      set((state) => ({ ...state, aStudent: null }));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },

  postSingleStudent: async (data: IStudent) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postSingleStudent({ data });
      const validData: IStudent = Array.isArray(response.newData)
        ? response.newData[0]
        : response.newData;
      set((state) => ({ ...state, newStudent: validData }));
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("add", "the student")
      );
    } catch (err: unknown) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("add", "the student")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  putSingleStudent: async (data: IStudent, id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await putSingleStudent({ data, id });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been saved", "Student information")
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("edit", "the student")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  deleteSingleStudent: async (id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await deleteSingleStudent({ id });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("deleted", "The student was")
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("delete", "the student")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
