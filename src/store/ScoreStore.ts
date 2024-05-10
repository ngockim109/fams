// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { AxiosError } from "axios";
import { IScore } from "../interfaces/score.interface";
import {
  getScoreByID,
  getScores,
  getScoresByStudentId,
  getScoresOfStudentInClass,
  postScore,
  postStudentScore,
  putScore,
} from "../services/api/api-caller/ScoreApiCaller";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";
import { IStudentScore } from "../interfaces/student-score.interface";
import { IModuleAssignmentScore } from "../interfaces/module-assignment-score.interface";

// SCORE STORE
interface IScoreStore {
  score: IScore[] | null;
  studentScore: IStudentScore[] | null;
  scoreDetail: IModuleAssignmentScore[] | null;
  scoreLoading: boolean;
  fetchScore: (
    id: string,
    searchTerm?: string,
    searchSignal?: AbortSignal
  ) => void;
  fetchScoreOfStudentInClass: (classId: string, studentId: string) => void;
  fetchAllScoreByStudentId: (id: string) => void;
  postScore: (data: IScore[]) => Promise<void>;
}

export const useScoreStore = create<IScoreStore>((set) => ({
  score: [],
  studentScore: [],
  scoreDetail: [],
  scoreLoading: false,
  fetchScore: async (
    id: string,
    searchTerm?: string,
    searchSignal?: AbortSignal
  ) => {
    // Set Loading true
    set((state) => ({ ...state, scoreLoading: true }));
    try {
      const data = await getScores(id, searchTerm, searchSignal);
      // Update scores when fetch successfully
      set((state) => ({ ...state, score: data }));
    } catch (err) {
      set((state) => ({ ...state, score: [] }));
    } finally {
      // Set scoreLoading false
      set((state) => ({ ...state, scoreLoading: false }));
    }
  },
  fetchScoreOfStudentInClass: async (classId: string, studentId: string) => {
    // Set Loading true
    set((state) => ({ ...state, scoreLoading: true }));
    try {
      const data = await getScoresOfStudentInClass(classId, studentId);
      // Update scores when fetch successfully
      set((state) => ({ ...state, scoreDetail: data }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set scoreLoading false
      set((state) => ({ ...state, scoreLoading: false }));
    }
  },
  fetchAllScoreByStudentId: async (id: string) => {
    // Set Loading true
    set((state) => ({ ...state, scoreLoading: true }));
    try {
      const data = await getScoresByStudentId(id);
      // Update scores when fetch successfully
      set((state) => ({ ...state, studentScore: data }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set scoreLoading false
      set((state) => ({ ...state, scoreLoading: false }));
    }
  },
  postScore: async (data: IScore[]) => {
    // Set Loading true
    set((state) => ({ ...state, scoreLoading: true }));
    try {
      await postScore({ data });
      successNotify(
        generateSuccessMessage("has been created", "Score information")
      );
    } catch (err) {
      // Catch & log error
      console.log("API Error:", err);
      errorNotify(generateErrorMessage("create", "new score"));
    } finally {
      // Set scoreLoading false
      set((state) => ({ ...state, scoreLoading: false }));
    }
  },
}));

// SINGLE SCORE OF A STUDENT STORE
interface ISingleScoreStore {
  aScore: IScore | null;
  loading: boolean;
  getStudentScoreByID: (id: string, classId: string) => void;
  postStudentScore: (data: IScore) => Promise<void>;
  putStudentScore: (data: IScore, id: string) => Promise<void>;
}

export const useSingleScoreStore = create<ISingleScoreStore>((set) => ({
  aScore: null,
  loading: false,
  getStudentScoreByID: async (id: string, classId: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getScoreByID({ id, classId });
      const validData: IScore | null = Array.isArray(data) ? data[0] : data;
      // Update scores of student when fetch successfully
      set((state) => ({ ...state, aScore: validData }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },

  postStudentScore: async (data: IScore) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await postStudentScore({ data });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been created", "Score information")
      );
    } catch (err) {
      // Catch & log error
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("create", "new score")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  putStudentScore: async (data: IScore, id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const response = await putScore({ data, id });
      successNotify(
        response?.message && response?.message !== ""
          ? response?.message
          : generateSuccessMessage("has been changed", "Score information")
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      errorNotify(
        axiosError?.response?.data?.toString() ??
          generateErrorMessage("edit", "the score")
      );
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
