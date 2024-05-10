import { create } from "zustand";
import { AxiosError } from "axios";
import {
  postStudentClassImport,
  postUserImport,
  postStudentImport,
  postStudentScoreImport,
} from "../services/api/api-caller/ImportCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

interface IImportStore {
  loading: boolean;
  postStudentImport: (file: File) => void;
  postStudentClassImport: (file: File) => void;
  postStudentScoreImport: (file: File, classId: string) => void;
  postUserImport: (file: File, senderId: string) => void;
}

const ImportStore = create<IImportStore>((set) => ({
  loading: false,

  postStudentImport: async (file: File) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudentImport(file);
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been uploaded",
              "The students information"
            )
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("import", "data")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  postStudentClassImport: async (file: File) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudentClassImport(file);
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been uploaded",
              "The students in class information"
            )
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("import", "student to class")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  postStudentScoreImport: async (file: File, classId: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudentScoreImport(file, classId);
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage(
              "has been uploaded",
              "The scores information"
            )
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("import", "student score")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  postUserImport: async (file: File, senderId: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postUserImport(file, senderId);
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage("has been uploaded", "The users information")
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("import", "user")
      );
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default ImportStore;
