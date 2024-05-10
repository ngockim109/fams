// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import { IReservedStudent } from "../interfaces/reserved-student.interface";
import {
  getAllClassReservedStudentByID,
  getReservedStudent,
  getReservedStudentByID,
  postReservedStudent,
  postReservedStudentByID,
  putSingleReserveStudent,
  putSingleReserveStudentInClass,
} from "../services/api/api-caller/ReservedStudentApiCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

// RESERVED STUDENT STORE
interface IReservedStudentStore {
  reservedStudent: IReservedStudent[] | null;
  loading: boolean;
  fetchReservedStudentByID: (id: string) => void;
  fetchReservedStudent: (
    searchTerm?: string,
    searchSignal?: AbortSignal
  ) => void;
  getAllReserveClass: (id: string) => void;
  postReservedStudent: (data: IReservedStudent[]) => Promise<void>;
}

export const useReservedStudentStore = create<IReservedStudentStore>((set) => ({
  reservedStudent: [],
  loading: false,
  fetchReservedStudent: async (searchTerm, searchSignal) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getReservedStudent(searchTerm ?? "", searchSignal);
      // Update reserved students when fetch successfully
      set((state) => ({ ...state, reservedStudent: data }));
    } catch (err) {
      // If fetch failed, update student empty array
      set((state) => ({ ...state, reservedStudent: [] }));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  getAllReserveClass: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getAllClassReservedStudentByID({ id });
      set((state) => ({ ...state, reservedStudent: data }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  fetchReservedStudentByID: async (id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getReservedStudentByID({ id });
      // Update reserved student when fetch successfully
      set((state) => ({ ...state, reservedStudent: data }));
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      console.log(axiosError);
      axiosError &&
        axiosError.response &&
        axiosError.response.data &&
        errorNotify(axiosError?.response?.data?.toString());
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  postReservedStudent: async (data: IReservedStudent[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      await postReservedStudent({ data });
      successNotify(
        generateSuccessMessage(
          "has been created",
          "Reserved student information"
        )
      );
    } catch (err) {
      // Catch & log error
      console.log("API Error:", err);
      errorNotify(generateErrorMessage("create", "new student"));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

// RESERVED STUDENT SINGLE STORE
interface IReservedStudentSingleStore {
  aReservedStudent: IReservedStudent | null;
  loading: boolean;
  postReservedStudent: (data: IReservedStudent) => Promise<void>;
  putReservedStudent: (id: string, data: IReservedStudent) => Promise<void>;
  putReserveStudentInClass: (
    id: string,
    oldClassId: string,
    data: Pick<IReservedStudent, "ClassId" | "Status">
  ) => Promise<void>;
}

export const useReservedStudentSingleStore =
  create<IReservedStudentSingleStore>((set) => ({
    aReservedStudent: null,
    loading: false,

    postReservedStudent: async (data: IReservedStudent) => {
      // Set Loading true
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await postReservedStudentByID({ data });
        successNotify(
          response && response !== ""
            ? response
            : generateSuccessMessage(
                "has been created",
                "Reserved student information"
              )
        );
      } catch (err) {
        // Catch & log error
        const axiosError = err as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("create", "new reserved student")
        );
      } finally {
        // Set loading false
        set((state) => ({ ...state, loading: false }));
      }
    },
    putReservedStudent: async (id: string, data: IReservedStudent) => {
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await putSingleReserveStudent({ id, data });
        successNotify(
          response && response !== ""
            ? response
            : generateSuccessMessage(
                "has been changed",
                "Reserved student information"
              )
        );
      } catch (err) {
        // Catch & log error
        const axiosError = err as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("edit", "the reserved student")
        );
      } finally {
        // Set loading false
        set((state) => ({ ...state, loading: false }));
      }
    },
    putReserveStudentInClass: async (
      id: string,
      oldClassId: string,
      data: Pick<IReservedStudent, "ClassId" | "Status">
    ) => {
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await putSingleReserveStudentInClass({
          id,
          oldClassId,
          data,
        });
        successNotify(
          response && response !== ""
            ? response
            : generateSuccessMessage(
                "has been changed",
                "Reserved student information"
              )
        );
      } catch (err) {
        // Catch & log error
        const axiosError = err as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("edit", "the reserved student in class")
        );
      } finally {
        // Set loading false
        set((state) => ({ ...state, loading: false }));
      }
    },
  }));
