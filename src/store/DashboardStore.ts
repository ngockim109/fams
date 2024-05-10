import { create } from "zustand";
import { IDashboard } from "../interfaces/dashboard.interface";
import { errorNotify } from "../components/atoms/Notify/Notify";
import { generateErrorMessage } from "../utils/GenerateErrorMessage";
import GetAllDataDashboard from "../services/api/api-caller/DashboardCaller";

interface DashboardStoreProps {
  dashboard: IDashboard | null;
  loading: boolean;
  fetchDashboard: () => void;
}

const useDashboardStore = create<DashboardStoreProps>((set) => ({
  dashboard: null,
  loading: false,
  fetchDashboard: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const data = await GetAllDataDashboard();
      set((state) => ({ ...state, dashboard: data }));
    } catch (err) {
      console.log("API Error:", err);
      errorNotify(generateErrorMessage("get", "dashboard"));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default useDashboardStore;
