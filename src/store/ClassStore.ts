// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value

import { create } from "zustand";
import { IClass } from "../interfaces/class.interface";
import {
  getClass,
  getClassByID,
  getClassesByName,
} from "../services/api/api-caller/ClassApiCaller";

// CLASS STORE
interface IClassStore {
  classes: IClass[] | null;
  loading: boolean;
  fetchClass: () => void;
  getAllClassToReClass: (className: string, studentId: string) => void;
}

export const useClassStore = create<IClassStore>((set) => ({
  classes: [],
  loading: false,
  fetchClass: async () => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getClass();
      // Update student when fetch successfully
      set((state) => ({ ...state, classes: data }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
  getAllClassToReClass: async (className: string, studentId: string) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getClassesByName({ className, studentId });
      // Update student when fetch successfully
      set((state) => ({ ...state, classes: data }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

// SINGLE CLASS STORE
interface ISingleClassStore {
  aClass: IClass | null;
  loading: boolean;
  getClassByID: (id: string) => void;
}
export const useSingleClassStore = create<ISingleClassStore>((set) => ({
  aClass: null,
  loading: false,
  getClassByID: async (id: string) => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getClassByID({ id });
      // Update class when fetch successfully
      const validData: IClass | null = Array.isArray(data) ? data[0] : data;
      set((state) => ({ ...state, aClass: validData }));
    } catch (err) {
      console.error(err);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));
