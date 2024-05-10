// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import { IActivityLog } from "../interfaces/activity-log.interface";
import {
  getActivityLogsByStudentID,
  postActivityLogByClass,
  postAnActivityLog,
  postAnActivityLogForTrainer,
  postAnScoreEmail,
} from "../services/api/api-caller/ActivityLogApiCaller";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";

interface IActivityLogStore {
  loading: boolean;
  activityLogs: IActivityLog[] | null;
  fetchActivityLogByStudentID: (id: string) => void;
  postActivityLogByClassID: (data: IActivityLog, classId: string) => void;
}
export const useActivityLogStore = create<IActivityLogStore>((set) => ({
  loading: false,
  activityLogs: null,
  fetchActivityLogByStudentID: async (id: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getActivityLogsByStudentID({ id });
      set((state) => ({ ...state, activityLogs: data }));
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  postActivityLogByClassID: async (data: IActivityLog, classId: string) => {
    set((state) => ({ ...state, loadingActivityLog: true }));
    try {
      const response = await postActivityLogByClass({ data, classId });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage("has been sent to class", "Email")
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("send", "email remind")
      );
    } finally {
      set((state) => ({ ...state, loadingActivityLog: false }));
    }
  },
}));
interface ISingleActivityLogs {
  loadingActivityLog: boolean;
  anActivityLog: IActivityLog | null;
  postActivityLog: (data: IActivityLog) => void;
  postActivityLogForTrainer: (data: IActivityLog) => void;
  postEmailScore: (data: IActivityLog) => void;
}
export const useSingleActivityLogStore = create<ISingleActivityLogs>((set) => ({
  loadingActivityLog: false,
  anActivityLog: null,
  postActivityLog: async (data: IActivityLog) => {
    set((state) => ({ ...state, loadingActivityLog: true }));
    try {
      const response = await postAnActivityLog({ data });
      successNotify(
        response && response !== ""
          ? response
          : generateSuccessMessage("has been sent", "Email remind")
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("send", "email remind")
      );
    } finally {
      set((state) => ({ ...state, loadingActivityLog: false }));
    }
  },
  postActivityLogForTrainer: async (data: IActivityLog) => {
    set((state) => ({ ...state, loadingActivityLog: true }));
    try {
      await postAnActivityLogForTrainer({ data });
      successNotify(generateSuccessMessage("has been sent", "Email"));
    } catch (error) {
      console.log("API Error:", error);
      errorNotify(generateErrorMessage("Send", "email"));
    } finally {
      set((state) => ({ ...state, loadingActivityLog: false }));
    }
  },
  postEmailScore: async (data: IActivityLog) => {
    set((state) => ({ ...state, loadingActivityLog: true }));
    try {
      await postAnScoreEmail({ data });
      successNotify(generateSuccessMessage("has been sent", "Email"));
    } catch (error) {
      console.log("API Error:", error);
      errorNotify(generateErrorMessage("Send", "email"));
    } finally {
      set((state) => ({ ...state, loadingActivityLog: false }));
    }
  },
}));
