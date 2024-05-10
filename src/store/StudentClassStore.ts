// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import {
  deleteSingleStudentInClass,
  getStudentClass,
  postStudentClass,
  postSingleStudentInClass,
  getStudentInClass,
  postSingleStudentToClass,
  putStudentClassStatus,
  putSingleStudentInClass,
} from "../services/api/api-caller/StudentClassApiCaller";
import {
  IPartStudentClass,
  IStudentClass,
} from "../interfaces/student-class.interface";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import { IStudentClassStatus } from "../interfaces/student-class-status.interface";
// STUDENT IN CLASS STORE
interface IStudentClassStore {
  studentClass: IStudentClass[] | null;
  studentClassStatus: IStudentClassStatus[] | null;
  loading: boolean;
  fetchStudentClass: (
    id: string,
    searchTerm?: string,
    searchSignal?: AbortSignal
  ) => void;
  postStudentClass: (data: IStudentClass[]) => Promise<void>;
  putStudentClassStatus: (data: IStudentClassStatus[]) => Promise<void>;
}

export const useStudentClassStore = create<IStudentClassStore>((set) => ({
  studentClass: [],
  loading: false,
  studentClassStatus: [],
  fetchStudentClass: async (
    id: string,
    searchTerm?: string,
    searchSignal?: AbortSignal
  ) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getStudentClass(id, searchTerm, searchSignal);
      // Update student when fetch successfully
      set((state) => ({ ...state, studentClass: data }));
    } catch (err) {
      set((state) => ({ ...state, studentClass: [] }));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  postStudentClass: async (data: IStudentClass[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudentClass({ data });
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
          generateErrorMessage("create", "the student")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  putStudentClassStatus: async (data: IStudentClassStatus[]) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await putStudentClassStatus({ data });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been saved", "Student information")
      );
    } catch (err: unknown) {
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
}));

interface ISingleStudentClassStore {
  studentClass: IStudentClass | null;
  loading: boolean;
  getSingleStudentInClass: (classId: string, studentId: string) => void;
  deleteSingleStudentInClass: (id: string, classId: string) => void;
  postSingleStudentInClass: (data: IStudentClass) => Promise<void>;
  postSingleStudentToClass: (
    classId: string,
    studentId: string
  ) => Promise<void>;
  putSingleStudentInClass: (
    classId: string,
    studentId: string,
    data: IPartStudentClass
  ) => Promise<void>;
}

export const useSingleStudentClassStore = create<ISingleStudentClassStore>(
  (set) => ({
    studentClass: null,
    loading: false,
    getSingleStudentInClass: async (classId: string, studentId: string) => {
      // Set Loading true
      set((state) => ({ ...state, loading: true }));
      try {
        const data = await getStudentInClass(classId, studentId);
        const validData: IStudentClass | null = Array.isArray(data)
          ? data[0]
          : data;
        // Update scores of student when fetch successfully
        set((state) => ({ ...state, studentClass: validData }));
      } catch (err: unknown) {
        // Catch & log error
        const axiosError = err as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("create", "new student")
        );

        set((state) => ({ ...state, studentClass: null }));
      } finally {
        // Set loading false
        set((state) => ({ ...state, loading: false }));
      }
    },
    deleteSingleStudentInClass: async (id: string, classId: string) => {
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await deleteSingleStudentInClass({ id, classId });
        successNotify(
          response?.message && response?.message !== ""
            ? response?.message
            : generateSuccessMessage("deleted", "The student")
        );
      } catch (error) {
        const axiosError = error as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("delete", "the student")
        );
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    postSingleStudentInClass: async (data: IStudentClass) => {
      // Set Loading true
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await postSingleStudentInClass({ data });
        successNotify(
          response?.message && response?.message !== ""
            ? response?.message
            : generateSuccessMessage("has been created", "Student information")
        );
      } catch (error) {
        // Catch & log error
        const axiosError = error as AxiosError;
        errorNotify(
          axiosError?.response?.data?.toString() ??
            generateErrorMessage("create", "new student")
        );
      } finally {
        // Set loading false
        set((state) => ({ ...state, loading: false }));
      }
    },
    postSingleStudentToClass: async (classId: string, studentId: string) => {
      // Set Loading true
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await postSingleStudentToClass({
          classId,
          studentId,
        });
        console.log(response);
        successNotify(
          response?.message && response?.message !== ""
            ? response?.message
            : generateSuccessMessage("create", "new student")
        );
      } catch (err: unknown) {
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
    putSingleStudentInClass: async (
      classId: string,
      studentId: string,
      data: IPartStudentClass
    ) => {
      // Set Loading true
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await putSingleStudentInClass({
          classId,
          studentId,
          data,
        });
        successNotify(
          response?.message && response?.message !== ""
            ? response?.message
            : generateSuccessMessage("has been edited", "Student information")
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
  })
);
