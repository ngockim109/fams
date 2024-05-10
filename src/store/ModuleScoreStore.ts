// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { IModuleScore } from "../interfaces/module-score";
import getModuleScores from "../services/api/api-caller/ModuleScoreApiCaller";

interface ModuleScoreProps {
  moduleScore: IModuleScore[] | null;
  loading: boolean;
  fetchModuleScores: () => void;
}
const useModuleScoreStore = create<ModuleScoreProps>((set) => ({
  moduleScore: null,
  loading: false,
  fetchModuleScores: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getModuleScores();
      set((state) => ({ ...state, moduleScore: data }));
    } catch (error) {
      console.error("API Error: ", error);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default useModuleScoreStore;
