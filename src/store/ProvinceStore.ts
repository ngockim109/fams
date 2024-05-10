// NOTE:
// 1: define interfaces/type for store
// 2: create store with the correct type/interface
// 3: use (state) => state.<state name> to access the current state value
// 4: use set(newState) to update state value
import { create } from "zustand";
import { IProvince } from "../interfaces/province.interface";
import getLocationProvinces from "../services/api/api-caller/ProvinceApiCaller";

// STUDENT STORE
interface IProvinceStore {
  province: IProvince[] | null;
  loading: boolean;
  fetchProvinces: () => void;
}

export const useProvinceStore = create<IProvinceStore>((set) => ({
  province: [],
  loading: false,
  fetchProvinces: async () => {
    // Set Loading true
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await getLocationProvinces();
      // Update province when fetch successfully
      set((state) => ({ ...state, province: data }));
    } catch (error) {
      console.error("API Error: ", error);
    } finally {
      // Set loading false
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default useProvinceStore;
