// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { IScore } from "../interfaces/score.interface";
import {
  getScoreByID,
  putScore,
} from "../services/api/api-caller/ScoreMockApiCaller";
import {
  generateErrorMessage,
  generateSuccessMessage,
} from "../utils/GenerateErrorMessage";
import { errorNotify, successNotify } from "../components/atoms/Notify/Notify";

// SINGLE SCORE OF A STUDENT STORE
interface ISingleScoreStore {
  aScore: IScore | null;
  loading: boolean;
  getStudentScoreByID: (id: string, classId: string) => void;

  putStudentScore: (data: IScore, id: string) => Promise<void>;
}
const useScoreMockStore = create<ISingleScoreStore>((set) => ({
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

  putStudentScore: async (data: IScore, id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      await putScore({ data, id });
      successNotify(
        generateSuccessMessage("has been changed", "Score information")
      );
    } catch (err) {
      errorNotify(generateErrorMessage("edit", "the score"));
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default useScoreMockStore;
